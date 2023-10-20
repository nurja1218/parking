import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { VehicleTypeName } from 'src/lib/enums';
import { VehicleMetaResponse } from './vehicle-meta.response';
import { ParkingFeeMetaResponse } from './parking-fee-meta.response';

export class VehicleTypeMetaResponse {
  @ApiProperty({ description: '차량 유형의 고유 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: '차량 유형 이름', enum: VehicleTypeName })
  @IsEnum(VehicleTypeName)
  typeName: VehicleTypeName;

  @ApiProperty({ description: '차량 유형 설명', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: '차량 유형에 따른 차량 목록',
    type: () => [VehicleMetaResponse],
    required: false,
  })
  vehicles: VehicleMetaResponse[];

  @ApiProperty({
    description: '차량 유형별 주차 요금',
    type: () => [ParkingFeeMetaResponse],
    required: false,
  })
  fees?: ParkingFeeMetaResponse[];
}
