import {MigrationInterface, QueryRunner} from "typeorm";

export class update11631536132462 implements MigrationInterface {
    name = 'update11631536132462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP COLUMN "totalQuantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD "totalQuantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD "totalPrice" integer NOT NULL`);
    }

}
