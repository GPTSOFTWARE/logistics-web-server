import {MigrationInterface, QueryRunner} from "typeorm";

export class update11631797833638 implements MigrationInterface {
    name = 'update11631797833638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_1ea2fe2f0067a2556a2ec7e70bd"`);
        await queryRunner.query(`ALTER TABLE "public"."product" RENAME COLUMN "unit" TO "unit_id"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_b15422982adca3bf53adfb535de" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_b15422982adca3bf53adfb535de"`);
        await queryRunner.query(`ALTER TABLE "public"."product" RENAME COLUMN "unit_id" TO "unit"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_1ea2fe2f0067a2556a2ec7e70bd" FOREIGN KEY ("unit") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
