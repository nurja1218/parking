import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { VehicleTypeMetaResponse } from './vehicle-type-meta.response';

export class ParkingFeeMetaResponse {
  @ApiProperty({ description: '주차 요금의 고유 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: '연관된 차량 유형',
    type: () => VehicleTypeMetaResponse,
  })
  vehicleType: VehicleTypeMetaResponse;

  @ApiProperty({ description: '주차의 시간당 요금' })
  @IsInt()
  hourlyRate: number;

  @ApiProperty({ description: '주차의 최대 일일 요금', required: false })
  @IsOptional()
  @IsInt()
  maxDailyRate?: number;
}
