import {MigrationInterface, QueryRunner} from "typeorm";

export class update41631892454530 implements MigrationInterface {
    name = 'update41631892454530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_0bf6aef2812f3367ab71cf0f82b"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "typeShip"`);
        await queryRunner.query(`DROP TYPE "public"."sale_order_typeship_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "driver_id"`);
        await queryRunner.query(`CREATE TYPE "public"."delivery_order_typeship_enum" AS ENUM('giao hàng nhanh', 'giao hàng tiêu chuẩn')`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" ADD "typeShip" "public"."delivery_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn'`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" ADD "plannedTime" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" ADD "driver_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" ADD CONSTRAINT "FK_24144ec628ab2173a1c3ee19753" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" DROP CONSTRAINT "FK_24144ec628ab2173a1c3ee19753"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" DROP COLUMN "driver_id"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" DROP COLUMN "plannedTime"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" DROP COLUMN "typeShip"`);
        await queryRunner.query(`DROP TYPE "public"."delivery_order_typeship_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "driver_id" integer`);
        await queryRunner.query(`CREATE TYPE "public"."sale_order_typeship_enum" AS ENUM('giao hàng nhanh', 'giao hàng tiêu chuẩn')`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "typeShip" "public"."sale_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn'`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_0bf6aef2812f3367ab71cf0f82b" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
