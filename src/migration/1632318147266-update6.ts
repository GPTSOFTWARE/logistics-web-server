import {MigrationInterface, QueryRunner} from "typeorm";

export class update61632318147266 implements MigrationInterface {
    name = 'update61632318147266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."account" ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."account" ADD "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."account" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."account" DROP COLUMN "updatedAt"`);
    }

}
