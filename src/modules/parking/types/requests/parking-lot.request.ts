import { ApiProperty } from '@nestjs/swagger';
import { ParkingSpace } from '../../entities/parking-space.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ParkingLotRequest {
  @ApiProperty({ description: '주차장 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '주차장 위치' })
  @IsString()
  location: string;

  @ApiProperty({ description: '총 주차 공간 수' })
  @IsNumber()
  totalSpaces: number;

  @ApiProperty({ description: '사용 가능한 주차 공간 수' })
  @IsOptional()
  @IsNumber()
  availableSpaces?: number;

  spaces?: ParkingSpace[];
}
