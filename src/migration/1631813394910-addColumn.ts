import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumn1631813394910 implements MigrationInterface {
    name = 'addColumn1631813394910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" DROP CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" DROP CONSTRAINT "FK_18cb133e08962a8241105a84164"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery" ADD "deliveryOrdersId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."delivery" ADD CONSTRAINT "FK_c508553676ca97666a70018651f" FOREIGN KEY ("deliveryOrdersId") REFERENCES "delivery_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."delivery" DROP CONSTRAINT "FK_c508553676ca97666a70018651f"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery" DROP COLUMN "deliveryOrdersId"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" ADD CONSTRAINT "FK_18cb133e08962a8241105a84164" FOREIGN KEY ("deliveryId") REFERENCES "delivery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" ADD CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2" FOREIGN KEY ("saleOrderId") REFERENCES "sale_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
