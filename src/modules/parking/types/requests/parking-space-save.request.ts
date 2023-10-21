import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class ParkingSpaceSaveRequest {
  @ApiProperty({
    description: '주차 공간의 고유 ID',
    format: 'uuid',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ description: '주차 구역 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '사용여부', default: false })
  @IsBoolean()
  isOccupied = false;
}
