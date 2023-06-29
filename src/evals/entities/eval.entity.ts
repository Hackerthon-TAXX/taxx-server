import { Riders } from "src/riders/entities/riders.entity";
import { Users } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Evals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  rate: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createTime: Date;

  @ManyToOne(() => Users, (user) => user.evals)
  users: Users;

  @ManyToOne(() => Riders, (rider) => rider.histories)
  riders: Riders;
}
