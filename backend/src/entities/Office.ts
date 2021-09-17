import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity("offices")
class Office {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    local: string;

    @Column()
    qt_consultants: number;

    @Column()
    percentage_allowed: number;

    @Column()
    address:string;
}

export{Office}