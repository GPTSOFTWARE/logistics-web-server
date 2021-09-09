import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseEntity1631190895913 implements MigrationInterface {
    name = 'BaseEntity1631190895913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "updatedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "createdAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "createdBy" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "updatedAt"`);
    }

}
