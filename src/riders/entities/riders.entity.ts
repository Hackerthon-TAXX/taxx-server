import { Histories } from 'src/histories/entities/histories.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Riders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ type: 'double' })
  latitude: number;

  @Column({ type: 'double' })
  longitude: number;

  @Column({ type: 'float', nullable: true })
  sum: number;

  @Column({ nullable: true })
  count: number;

  @CreateDateColumn()
  createTime: Date;

  @OneToMany(() => Histories, (history) => history.riders)
  histories: Histories[];
}
