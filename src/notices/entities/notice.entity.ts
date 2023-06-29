import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notices {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: string;

    @Column()
    value: string;
}
