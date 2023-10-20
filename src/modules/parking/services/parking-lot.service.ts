import { Injectable } from '@nestjs/common';
import { ParkingLot } from '../entities/parking-lot.entity';
import { ParkingLotRequest } from '../types/requests';
import { DataSource } from 'typeorm';
import { ParkingRepository } from '../repositories';
import { ParkingLotMetaResponse } from '../types/responses';

@Injectable()
export class ParkingLotService {
  constructor(
    private readonly parkingRepository: ParkingRepository,
    private readonly dataSource: DataSource,
  ) {}

  public async getParkingLots(): Promise<ParkingLot[]> {
    return;
  }

  public async getParkingLotById(id: string): Promise<ParkingLot> {
    return;
  }

  public async saveParkingLot(
    parkingLot: ParkingLotRequest,
  ): Promise<ParkingLotMetaResponse> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;

    let _savedParkingLotId: string | undefined;
    try {
      const { spaces, ...rest } = parkingLot;
      const [_savedParkingLot] =
        await this.parkingRepository.saveParkingLotsWithTransaction(manager, [
          {
            ...rest,
          },
        ]);

      await this.parkingRepository.saveParkingSpacesWithTransaction(
        manager,
        spaces.map((space) => ({ ...space, parkingLot: _savedParkingLot })),
      );
      _savedParkingLotId = _savedParkingLot.id;

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error('# Transaction failed: ' + err);
    } finally {
      await queryRunner.release();
    }

    const savedParkingLot = await this.parkingRepository.findParkingLot({
      where: { id: _savedParkingLotId },
    });
    return new ParkingLotMetaResponse(savedParkingLot);
  }
}
