import { Histories } from "src/histories/entities/histories.entity";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "json", nullable: true })
  payments: Array<Object>;

  @OneToMany(() => Histories, (history) => history.users)
  histories: Histories[];
}
