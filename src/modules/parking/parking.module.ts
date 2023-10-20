import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpace } from './entities/parking-space.entity';
import { HttpModule } from 'src/providers/http';
import { Vehicle } from './entities/vehicle.entity';
import { ParkingLot } from './entities/parking-lot.entity';
import { ParkingLotController } from './controllers/parking-lot.controller';
import { ParkingSpaceController } from './controllers/parking-space.controller';
import { ParkingLotService, ParkingSpaceService } from './services';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([ParkingSpace, Vehicle, ParkingLot]),
  ],
  providers: [ParkingLotService, ParkingSpaceService],
  controllers: [ParkingLotController, ParkingSpaceController],
  exports: [ParkingLotService, ParkingSpaceService],
})
export class ParkingModule {}
