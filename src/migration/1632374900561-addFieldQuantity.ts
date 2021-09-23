import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldQuantity1632374900561 implements MigrationInterface {
    name = 'addFieldQuantity1632374900561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."job" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."job" DROP COLUMN "quantity"`);
    }

}
