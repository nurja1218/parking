import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

class ParkingSpace {
  @ApiProperty({
    description: '주차장의 주차 공간 구역',
  })
  @IsString()
  section: string;

  @ApiProperty({
    description: '주차장의 주차 공간 번호',
  })
  @IsNumber()
  number: number;
}

export class ParkingLotSaveRequest {
  @ApiProperty({
    description: '주차장의 고유 ID',
    format: 'uuid',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  id?: string;

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
    type: () => [ParkingSpace],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @Type(() => ParkingSpace)
  spaces?: ParkingSpace[];
}
