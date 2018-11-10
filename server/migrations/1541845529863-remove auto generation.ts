import {MigrationInterface, QueryRunner} from "typeorm";

export class removeAutoGeneration1541845529863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "todo_entity" DROP CONSTRAINT "PK_5e18fff6d62959da212066f2882"`);
        await queryRunner.query(`ALTER TABLE "todo_entity" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "todo_entity" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo_entity" ADD CONSTRAINT "PK_5e18fff6d62959da212066f2882" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "todo_entity" DROP CONSTRAINT "PK_5e18fff6d62959da212066f2882"`);
        await queryRunner.query(`ALTER TABLE "todo_entity" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "todo_entity" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo_entity" ADD CONSTRAINT "PK_5e18fff6d62959da212066f2882" PRIMARY KEY ("id")`);
    }

}
