import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSchedule1631308522629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "schedules",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "office_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "schedule_date",
                    type: "timestamp" 
                }
            ],
              foreignKeys:[
                    {
                        name: "FKUSerSchedule",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKOfficeSchedule",
                        referencedTableName: "offices",
                        referencedColumnNames: ["id"],
                        columnNames: ["office_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
