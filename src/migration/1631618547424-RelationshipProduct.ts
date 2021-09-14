import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationshipProduct1631618547424 implements MigrationInterface {
    name = 'RelationshipProduct1631618547424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "to_address"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "order_value"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "toAddress" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "orderValue" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "orderValue"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "toAddress"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "order_value" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "to_address" character varying NOT NULL`);
    }

}
