import {MigrationInterface, QueryRunner} from "typeorm";

export class removeImage1632328558534 implements MigrationInterface {
    name = 'removeImage1632328558534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."driver" DROP COLUMN "img"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."driver" ADD "img" character varying NOT NULL`);
    }

}
