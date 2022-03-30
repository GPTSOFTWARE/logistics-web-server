import {MigrationInterface, QueryRunner} from "typeorm";

export class update71632469033711 implements MigrationInterface {
    name = 'update71632469033711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" DROP COLUMN "deletedAt"`);
    }

}
