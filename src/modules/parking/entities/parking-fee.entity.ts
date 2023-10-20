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

@Entity()
export class ParkingFee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => VehicleType, (type) => type.fees)
  vehicleType: VehicleType;

  @Column('decimal')
  hourlyRate: number;

  @Column('decimal', {
    nullable: true,
  })
  maxDailyRate?: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt?: Date;
}
