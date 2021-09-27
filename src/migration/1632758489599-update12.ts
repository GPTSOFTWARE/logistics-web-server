import {MigrationInterface, QueryRunner} from "typeorm";

export class update121632758489599 implements MigrationInterface {
    name = 'update121632758489599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request_order" ("id" SERIAL NOT NULL, "fullname" character varying(100) NOT NULL, "phone" character varying(11) NOT NULL, "email" character varying(100), "address" text NOT NULL, "typeProduct" character varying NOT NULL, "weight" numeric NOT NULL, "fastShip" boolean NOT NULL, "note" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_ba6b6b4786462745d3212e1cc7a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "request_order"`);
    }

}
