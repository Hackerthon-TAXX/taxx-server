import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Riders {
    @PrimaryColumn()
    id: number;

    @Column()
    image: string;

    @Column( {type: "float"})
    latitude: number;

    @Column( {type: "float"})
    longitude: number;

    @Column({default:null, nullable: true})
    sum: number;

    @Column({default:null, nullable: true})
    count: number;
}
