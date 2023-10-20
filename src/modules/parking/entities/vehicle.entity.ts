import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ParkingSpace } from './parking-space.entity';
import { VehicleType } from './vehicle-type.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '차량의 고유 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @Column()
  @ApiProperty({ description: '차량 번호판' })
  @IsString()
  licensePlate: string;

  @Column()
  @ApiProperty({ description: '차량 소유주 이름' })
  @IsString()
  ownerName: string;

  @Column()
  @ApiProperty({ description: '차량 모델' })
  @IsString()
  model: string;

  @Column()
  @ApiProperty({ description: '차량 색상' })
  @IsString()
  color: string;

  @ManyToOne(() => VehicleType, (type) => type.vehicles)
  @ApiProperty({ description: '차량 유형', type: () => VehicleType })
  vehicleType: VehicleType;

  @OneToOne(() => ParkingSpace, (space) => space.vehicle)
  @ApiProperty({ description: '차량이 주차된 구역', type: () => ParkingSpace })
  space: ParkingSpace;

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
