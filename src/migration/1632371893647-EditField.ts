import {MigrationInterface, QueryRunner} from "typeorm";

export class EditField1632371893647 implements MigrationInterface {
    name = 'EditField1632371893647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."job" ADD "position" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."job" ADD "require" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."job" ADD "thumbnails" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."job" DROP COLUMN "thumbnails"`);
        await queryRunner.query(`ALTER TABLE "public"."job" DROP COLUMN "require"`);
        await queryRunner.query(`ALTER TABLE "public"."job" DROP COLUMN "position"`);
    }

}
