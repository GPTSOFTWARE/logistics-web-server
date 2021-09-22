import {MigrationInterface, QueryRunner} from "typeorm";

export class update41632314676795 implements MigrationInterface {
    name = 'update41632314676795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."driver" ADD "img" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."driver" ADD "idenityCard" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."driver" ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."driver" ADD "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."driver" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."driver" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."driver" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."driver" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."driver" DROP COLUMN "idenityCard"`);
        await queryRunner.query(`ALTER TABLE "public"."driver" DROP COLUMN "img"`);
    }

}
