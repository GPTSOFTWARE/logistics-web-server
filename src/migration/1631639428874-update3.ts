import {MigrationInterface, QueryRunner} from "typeorm";

export class update31631639428874 implements MigrationInterface {
    name = 'update31631639428874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_d9a27f8e64dfc0087af7d2f9ad7"`);
        await queryRunner.query(`ALTER TABLE "public"."product" RENAME COLUMN "orderIdId" TO "order_id"`);
        await queryRunner.query(`CREATE TABLE "delivery_order_item" ("id" SERIAL NOT NULL, CONSTRAINT "PK_1613a3e7161e665dc8560bd7488" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order_header" ADD CONSTRAINT "FK_89599a18dd7a0bc9a6095878874" FOREIGN KEY ("deliveriesId") REFERENCES "delivery_order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_755796eb8753933f61e3c339beb" FOREIGN KEY ("ordersId") REFERENCES "delivery_order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_9849f0d8ce095e50e752616f691" FOREIGN KEY ("order_id") REFERENCES "sale_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_9849f0d8ce095e50e752616f691"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_755796eb8753933f61e3c339beb"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order_header" DROP CONSTRAINT "FK_89599a18dd7a0bc9a6095878874"`);
        await queryRunner.query(`DROP TABLE "delivery_order_item"`);
        await queryRunner.query(`ALTER TABLE "public"."product" RENAME COLUMN "order_id" TO "orderIdId"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_d9a27f8e64dfc0087af7d2f9ad7" FOREIGN KEY ("orderIdId") REFERENCES "sale_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
