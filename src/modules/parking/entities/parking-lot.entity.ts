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
import { ParkingSpace } from './parking-space.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@Entity()
export class ParkingLot extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '주차장의 고유 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @Column()
  @ApiProperty({ description: '주차장 이름' })
  @IsString()
  name: string;

  @Column()
  @ApiProperty({ description: '주차장 위치' })
  @IsString()
  location: string;

  @Column()
  @ApiProperty({ description: '전체 주차 공간 수' })
  @IsNumber()
  totalSpaces: number;

  @Column()
  @ApiProperty({ description: '사용 가능한 주차 공간 수' })
  @IsNumber()
  availableSpaces: number;

  @OneToMany(() => ParkingSpace, (space) => space.parkingLot, {
    nullable: true,
  })
  @ApiProperty({
    description: '해당 주차장의 주차 공간들',
    type: () => [ParkingSpace],
    required: false,
  })
  spaces?: ParkingSpace[];

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
