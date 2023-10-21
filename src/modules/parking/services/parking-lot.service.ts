import { BadRequestException, Injectable } from '@nestjs/common';
import { ParkingLot } from '../entities/parking-lot.entity';
import { ParkingLotSaveRequest } from '../types/requests';
import { DataSource } from 'typeorm';
import { ParkingRepository } from '../repositories';
import { ParkingLotMetaResponse } from '../types/responses';
import { ParkingSpace } from '../entities/parking-space.entity';

@Injectable()
export class ParkingLotService {
  constructor(
    private readonly parkingRepository: ParkingRepository,
    private readonly dataSource: DataSource,
  ) {}

  public async getParkingLots(): Promise<ParkingLotMetaResponse[]> {
    const parkingLots = await ParkingLot.find();
    return parkingLots.map(
      (parkingLot) => new ParkingLotMetaResponse(parkingLot),
    );
  }

  public async getParkingLotById(id: string): Promise<ParkingLotMetaResponse> {
    const savedParkingLot = await this.parkingRepository.findParkingLotOrThrow({
      where: { id },
      order: { spaces: { name: 'ASC' } },
    });

    return new ParkingLotMetaResponse(savedParkingLot);
  }

  public async saveParkingLot(
    parkingLot: ParkingLotSaveRequest,
  ): Promise<ParkingLotMetaResponse> {
    const existParkingLot = await this.parkingRepository.findParkingLot({
      where: {
        name: parkingLot.name,
      },
    });

    if (!!existParkingLot) {
      throw new BadRequestException(
        `already exists parkingLot by name: ${parkingLot.name}`,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;

    let _savedParkingLotId: string | undefined;
    try {
      const { spaces: _spaces, ...rest } = parkingLot;
      const [_savedParkingLot] =
        await this.parkingRepository.saveParkingLotsWithTransaction(manager, [
          {
            ...rest,
          },
        ]);

      const spaces = _spaces.reduce((acc, { section, number }) => {
        if (!!section && !!number) {
          const digit = String(number).length;
          acc = [
            ...acc,
            ...[...Array(number)].map((_, idx) => ({
              name: `${section}` + `${idx + 1}`.padStart(digit, '0'),
              isOccupied: false,
              parkingLot: _savedParkingLot,
            })),
          ];
        }
        return acc;
      }, [] as Partial<ParkingSpace>[]);

      await this.parkingRepository.saveParkingSpacesWithTransaction(
        manager,
        spaces,
      );

      _savedParkingLotId = _savedParkingLot.id;

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error('# Transaction failed: ' + err);
    } finally {
      await queryRunner.release();
    }

    const savedParkingLot = await this.parkingRepository.findParkingLotOrThrow({
      where: { id: _savedParkingLotId },
      order: { spaces: { name: 'ASC' } },
    });
    return new ParkingLotMetaResponse(savedParkingLot);
  }
}
