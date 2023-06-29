import { Histories } from "src/histories/entities/histories.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Riders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ type: "float" })
  latitude: number;

  @Column({ type: "float" })
  longitude: number;

  @Column({ default: null, nullable: true })
  sum: number;

  @Column({ default: null, nullable: true })
  count: number;

  @CreateDateColumn()
  createTime: Date;

  @OneToMany(() => Histories, (history) => history.riders)
  histories: Histories[];
}
