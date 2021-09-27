import {MigrationInterface, QueryRunner} from "typeorm";

export class addBase1632765709111 implements MigrationInterface {
    name = 'addBase1632765709111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."contact" ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."contact" ADD "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."contact" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "public"."contact" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "public"."contact" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."contact" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."contact" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "public"."contact" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "public"."contact" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."contact" DROP COLUMN "updatedAt"`);
    }

}
