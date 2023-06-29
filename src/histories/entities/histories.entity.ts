import { Riders } from "src/riders/entities/riders.entity";
import { Users } from "src/users/entities/users.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";

@Entity()
export class Histories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column()
  request: string;

  @Column()
  payments: string;

  @Column({ type: "float" })
  startLatitude: number;

  @Column({ type: "float" })
  startLongitude: number;

  @Column({ type: "float" })
  arrivalLatitude: number;

  @Column({ type: "float" })
  arrivalLongitude: number;

  @CreateDateColumn()
  createTime: Date;

  @ManyToOne(() => Users, (user) => user.histories)
  users: Users;

  @ManyToOne(() => Riders, (rider) => rider.histories)
  riders: Riders;
}
