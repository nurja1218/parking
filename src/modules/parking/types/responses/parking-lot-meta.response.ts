import { ApiProperty } from '@nestjs/swagger';
import { ParkingSpace } from '../../entities/parking-space.entity';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ParkingSpaceMetaResponse } from './parking-space-meta.response';
import { Type } from 'class-transformer';
import { ParkingLot } from '../../entities/parking-lot.entity';

export class ParkingLotMetaResponse {
  @ApiProperty({ description: '주차장의 고유 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: '주차장 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '주차장 위치' })
  @IsString()
  location: string;

  @ApiProperty({ description: '총 주차 공간 수' })
  @IsNumber()
  totalSpaces: number;

  @ApiProperty({ description: '사용 가능한 주차 공간 수', required: false })
  @IsOptional()
  @IsNumber()
  availableSpaces?: number;

  @ApiProperty({
    description: '주차장의 주차 공간 목록',
    type: () => [ParkingSpaceMetaResponse],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @Type(() => ParkingSpaceMetaResponse)
  spaces?: ParkingSpaceMetaResponse[];

  constructor(parkingLot: ParkingLot) {
    this.id = parkingLot.id;
    this.name = parkingLot.name;
    this.location = parkingLot.location;
    this.totalSpaces = parkingLot.totalSpaces;
    this.availableSpaces = parkingLot.availableSpaces;
    this.spaces = parkingLot.spaces.map(
      (space) => new ParkingSpaceMetaResponse(space),
    );
  }
}
