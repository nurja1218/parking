import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { ParkingSpaceMetaResponse } from './parking-space-meta.response';
import { VehicleTypeMetaResponse } from './vehicle-type-meta.response';

export class VehicleMetaResponse {
  @ApiProperty({ description: '차량의 고유 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: '차량 번호판' })
  @IsString()
  licensePlate: string;

  @ApiProperty({ description: '차량 소유주 이름' })
  @IsString()
  ownerName: string;

  @ApiProperty({ description: '차량 모델' })
  @IsString()
  model: string;

  @ApiProperty({ description: '차량 색상' })
  @IsString()
  color: string;

  @ApiProperty({
    description: '차량 유형',
    type: () => VehicleTypeMetaResponse,
  })
  vehicleType: VehicleTypeMetaResponse;

  @ApiProperty({
    description: '차량이 주차된 구역',
    type: () => ParkingSpaceMetaResponse,
  })
  space: ParkingSpaceMetaResponse;
}
