import {IsNull, MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOffices1631300474679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"offices",
                columns:[
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true
                   },
                   {
                       name: "name",
                       type: "varchar"
                   },
                   {
                        name: "local",
                        type: "varchar"
                   },
                   {
                        name: "qt_consultants",
                        type: "int"
                   },
                   {
                        name: "percentage_allowed",
                        type: "int"
                   },
                   {
                        name: "address",
                        type: "varchar"
                   }
                ]            
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("offices");
    }

}
