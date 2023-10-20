import { Injectable } from '@nestjs/common';
import { ParkingLot } from '../entities/parking-lot.entity';

@Injectable()
export class ParkingLotService {
  // constructor(private readonly weatherService: WeatherService) {}

  public async getParkingLots(): Promise<ParkingLot[]> {
    return;
  }

  public async getParkingLotById(id: string): Promise<ParkingLot> {
    return;
  }
}
