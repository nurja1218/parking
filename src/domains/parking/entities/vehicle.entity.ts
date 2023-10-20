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

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  licensePlate: string;

  @Column()
  ownerName: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @ManyToOne(() => VehicleType, (type) => type.vehicles)
  vehicleType: VehicleType;

  @OneToOne(() => ParkingSpace, (space) => space.vehicle)
  space: ParkingSpace;

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
