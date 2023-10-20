import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { VehicleType } from './vehicle-type.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional, IsUUID } from 'class-validator';

@Entity()
export class ParkingFee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '주차 요금의 고유 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @ManyToOne(() => VehicleType, (type) => type.fees)
  @ApiProperty({ description: '연관된 차량 유형', type: () => VehicleType })
  vehicleType: VehicleType;

  @Column('int')
  @ApiProperty({ description: '주차의 시간당 요금' })
  @IsInt()
  hourlyRate: number;

  @Column('int', {
    nullable: true,
  })
  @ApiProperty({ description: '주차의 최대 일일 요금', required: false })
  @IsOptional()
  @IsInt()
  maxDailyRate?: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  @ApiProperty({
    description: '생성 날짜',
    type: () => Date,
  })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  @ApiProperty({
    description: '업데이트 날짜',
    type: () => Date,
  })
  @IsDate()
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  @ApiProperty({
    description: '삭제된 날짜',
    type: () => Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
