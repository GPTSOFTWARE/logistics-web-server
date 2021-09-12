import {MigrationInterface, QueryRunner} from "typeorm";

export class update1631415871027 implements MigrationInterface {
    name = 'update1631415871027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."account" ADD "imgUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."account" DROP COLUMN "imgUrl"`);
    }

}
