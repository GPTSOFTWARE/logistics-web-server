import {MigrationInterface, QueryRunner} from "typeorm";

export class update21632143524458 implements MigrationInterface {
    name = 'update21632143524458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "title" character varying NOT NULL, "text" text NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request_order" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "typeProduct" character varying NOT NULL, "weight" integer NOT NULL, "fastShip" boolean NOT NULL, "note" character varying NOT NULL, CONSTRAINT "PK_ba6b6b4786462745d3212e1cc7a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "request_order"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
