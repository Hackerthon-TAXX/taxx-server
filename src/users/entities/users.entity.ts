import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "json", nullable: true })
  payments: Array<Object>;
}
