import { Evals } from "src/evals/entities/eval.entity";
import { Histories } from "src/histories/entities/histories.entity";
import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "json", nullable: true })
  payments: Array<Object>;

  @CreateDateColumn()
  createTime: Date;

  @OneToMany(() => Histories, (history) => history.users)
  histories: Histories[];

  @OneToMany(() => Evals, (evals) => evals.users)
  evals: Evals[];
}
