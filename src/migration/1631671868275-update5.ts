import {MigrationInterface, QueryRunner} from "typeorm";

export class update51631671868275 implements MigrationInterface {
    name = 'update51631671868275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
    }

}
