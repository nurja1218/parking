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

@Entity()
export class ParkingLot extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  totalSpaces: number;

  @Column()
  availableSpaces: number;

  @OneToMany(() => ParkingSpace, (space) => space.parkingLot, {
    nullable: true,
  })
  spaces?: ParkingSpace[];

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
