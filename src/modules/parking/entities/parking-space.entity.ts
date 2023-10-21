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
import { ParkingLot } from './parking-lot.entity';
import { Vehicle } from './vehicle.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@Entity()
export class ParkingSpace extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '주차 공간의 고유 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @Column()
  @ApiProperty({ description: '주차 구역 이름' })
  @IsString()
  name: string;

  @Column()
  @ApiProperty({ description: '주차 여부' })
  @IsBoolean()
  isOccupied: boolean;

  @ManyToOne(() => ParkingLot, (lot) => lot.spaces)
  @ApiProperty({
    description: '해당 주차 구역이 속한 주차장',
    type: () => ParkingLot,
  })
  parkingLot: ParkingLot;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.space, { nullable: true })
  @ApiProperty({
    description: '해당 주차 구역에 주차된 차량',
    type: () => Vehicle,
    required: false,
  })
  vehicle?: Vehicle;

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
