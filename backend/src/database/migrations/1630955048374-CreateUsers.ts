import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1630955048374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns:[
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "nm_email",
                        type: "varchar"
                    },
                    {
                        name: "nm_password",
                        type: "varchar"
                    },
                    {
                        name: "nm_user",
                        type: "varchar"
                    },
                    {
                        name: "nm_working_area",
                        type: "varchar"
                    },
                    {
                        name: "nm_contact",
                        type: "varchar"
                    },
                    {
                        name: "nm_picture",
                        type: "varchar"
                    },
                    {
                        name: "ic_admin",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
