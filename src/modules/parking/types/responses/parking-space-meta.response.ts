import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { ParkingLotMetaResponse } from './parking-lot-meta.response';
import { VehicleMetaResponse } from './vehicle-meta.response';
import { ParkingSpace } from '../../entities/parking-space.entity';

export class ParkingSpaceMetaResponse {
  @ApiProperty({ description: '주차 공간의 고유 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: '주차 구역 이름' })
  @IsString()
  number: string;

  @ApiProperty({ description: '사용여부', default: false })
  @IsBoolean()
  isOccupied = false;

  @ApiProperty({
    description: '해당 주차 구역이 속한 주차장',
    type: () => ParkingLotMetaResponse,
  })
  parkingLot: ParkingLotMetaResponse;

  @ApiProperty({
    description: '해당 주차 구역에 주차된 차량',
    type: () => VehicleMetaResponse,
    required: false,
  })
  vehicle?: VehicleMetaResponse;

  constructor(parkingSpace: ParkingSpace) {
    this.id = parkingSpace.id;
    this.isOccupied = parkingSpace.isOccupied;
    this.number = parkingSpace.number;
    this.parkingLot = new ParkingLotMetaResponse(parkingSpace.parkingLot);
  }
}
