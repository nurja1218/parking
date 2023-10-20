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

@Entity()
export class ParkingSpace extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @Column()
  isOccupied: boolean;

  @ManyToOne(() => ParkingLot, (lot) => lot.spaces)
  parkingLot: ParkingLot;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.space, {
    nullable: true,
  })
  vehicle?: Vehicle;

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
