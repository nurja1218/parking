import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { ParkingFee } from './parking-fee.entity';
import { VehicleTypeName } from 'src/lib/enums';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class VehicleType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '차량 유형의 고유 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @Column()
  @ApiProperty({ description: '차량 유형 이름', enum: VehicleTypeName })
  @IsEnum(VehicleTypeName)
  typeName: VehicleTypeName;

  @Column({ nullable: true })
  @ApiProperty({ description: '차량 유형 설명', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleType, {
    nullable: true,
  })
  @ApiProperty({
    description: '차량 유형에 따른 차량 목록',
    type: () => [Vehicle],
    required: false,
  })
  vehicles: Vehicle[];

  @OneToMany(() => ParkingFee, (fee) => fee.vehicleType, { nullable: true })
  @ApiProperty({
    description: '차량 유형별 주차 요금',
    type: () => [ParkingFee],
    required: false,
  })
  fees?: ParkingFee[];

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
