import {MigrationInterface, QueryRunner} from "typeorm";

export class update51632318055183 implements MigrationInterface {
    name = 'update51632318055183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."account" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."account" DROP COLUMN "deletedAt"`);
    }

}
