import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ParkingLotService } from '../services';
import { ParkingLot } from '../entities/parking-lot.entity';
@Controller('v1/parking')
export class ParkingLotController {
  constructor(private readonly parkingLotService: ParkingLotService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getParkingLots(): Promise<ParkingLot[]> {
    return this.parkingLotService.getParkingLots();
  }

  @Get(':id')
  getParkingLot(@Param('id') id: string): Promise<ParkingLot> {
    return this.parkingLotService.getParkingLotById(id);
  }

  // @Post()
  // async getParkingStatus(
  //   @Body('input')
  //   vehicle: VehicleInput,
  // ): Promise<string> {
  //   return await this.parkingLotService.getParkingStatus(vehicle);
  // }
}
