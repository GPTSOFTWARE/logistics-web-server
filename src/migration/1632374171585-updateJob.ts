import {MigrationInterface, QueryRunner} from "typeorm";

export class updateJob1632374171585 implements MigrationInterface {
    name = 'updateJob1632374171585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."job" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."job" DROP COLUMN "deletedAt"`);
    }

}
