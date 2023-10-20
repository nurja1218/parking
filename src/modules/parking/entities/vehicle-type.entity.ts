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

@Entity()
export class VehicleType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  typeName: VehicleTypeName;

  @Column({
    nullable: true,
  })
  description: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleType, {
    nullable: true,
  })
  vehicles: Vehicle[];

  @OneToMany(() => ParkingFee, (fee) => fee.vehicleType, {
    nullable: true,
  })
  fees?: ParkingFee[];

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
