import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class ParkingSpaceRequest {
  @ApiProperty({ description: '주차 구역 이름' })
  @IsString()
  number: string;

  @ApiProperty({ description: '사용여부', default: false })
  @IsBoolean()
  isOccupied = false;
}
