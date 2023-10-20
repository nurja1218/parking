import { Injectable } from '@nestjs/common';
import { EntityManager, FindManyOptions, FindOneOptions } from 'typeorm';
import { ParkingLot } from '../entities/parking-lot.entity';
import { ParkingSpace } from '../entities/parking-space.entity';

@Injectable()
export class ParkingRepository {
  public async findParkingLots(
    options: FindManyOptions<ParkingLot>,
  ): Promise<ParkingLot[]> {
    return await ParkingLot.find({
      ...options,
    });
  }

  public async findParkingLot(
    options: FindOneOptions<ParkingLot>,
  ): Promise<ParkingLot> {
    return await ParkingLot.findOne(options);
  }

  public async saveParkingLotsWithTransaction(
    transactionManager: EntityManager,
    parkingLots: Partial<ParkingLot>[],
  ): Promise<ParkingLot[]> {
    const _parkingLots: ParkingLot[] = [];
    for (const _parkingLot of parkingLots) {
      const parkingLot = await transactionManager.save(
        ParkingLot.create(_parkingLot),
      );
      _parkingLots.push(parkingLot as ParkingLot);
    }
    return _parkingLots;
  }

  public async saveParkingSpacesWithTransaction(
    transactionManager: EntityManager,
    parkingSpaces: Partial<ParkingSpace>[],
  ): Promise<ParkingSpace[]> {
    const _parkingSpaces: ParkingSpace[] = [];
    for (const _parkingSpace of parkingSpaces) {
      const parkingSpace = await transactionManager.save(
        ParkingSpace.create(_parkingSpace),
      );
      _parkingSpaces.push(parkingSpace as ParkingSpace);
    }
    return _parkingSpaces;
  }
}
