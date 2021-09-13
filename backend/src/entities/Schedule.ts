import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Office } from "./Office";
import { User } from "./User";

@Entity("schedules")
class Schedule{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    schedule_date:Date;

    @Column()
    user_id:number;
    @JoinColumn({name: "user_id"})
    @ManyToOne( ()=> User)
    user: User;

    @Column()
    office_id:number;
    @JoinColumn({name: "office_id"})
    @ManyToOne( () => Office)
    office: Office


}

export {Schedule}