import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
class User{
    
    @PrimaryGeneratedColumn()
    id_user: number;
    @Column()
    nm_email: string;

    @Column()
    nm_password: string;

    @Column()
    nm_user: string;

    @Column()
    nm_working_area: string;

    @Column()
    nm_contact: string

    @Column()
    nm_picture: string;

    @Column()
    ic_admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export{User}