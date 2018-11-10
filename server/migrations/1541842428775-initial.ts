import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1541842428775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isAnonymous" boolean NOT NULL, "username" text, "passwordHash" text, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_5e18fff6d62959da212066f2882" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo_entity" ADD CONSTRAINT "FK_d79ee2ef1862085674b08bbe853" FOREIGN KEY ("ownerId") REFERENCES "user_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "todo_entity" DROP CONSTRAINT "FK_d79ee2ef1862085674b08bbe853"`);
        await queryRunner.query(`DROP TABLE "todo_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
