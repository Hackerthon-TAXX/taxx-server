import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Evals {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // 외래키 설정 필요
    rider: number;
    
    @Column()
    // 외래키 설정 필요
    user: number;
    
    @Column({ type: "float" })
    rate: number;

    @Column({default: null, nullable: true })
    comment: string;
}
