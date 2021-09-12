import {MigrationInterface, QueryRunner} from "typeorm";

export class upadteRelationProductAndOrder1631249486717 implements MigrationInterface {
    name = 'upadteRelationProductAndOrder1631249486717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_e50fa90dde1ccc766aa3d527063"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "FK_9f50b61a8eda5dac410e30c06d8"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "sOIProductSOHs"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "sOIProductProducts"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP CONSTRAINT "PK_cbfad306973a889f91d78e6cbe3"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD CONSTRAINT "PK_6a579db46b4c1483c4cf8d718e9" PRIMARY KEY ("Products")`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP COLUMN "SOHs"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP CONSTRAINT "PK_6a579db46b4c1483c4cf8d718e9"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP COLUMN "Products"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "SOI_id"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD CONSTRAINT "PK_a693b37099d9587f2c808669348" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD "SOH_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD CONSTRAINT "FK_750ed8df8067df034342c1af1fe" FOREIGN KEY ("SOH_id") REFERENCES "sale_order_header"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD CONSTRAINT "FK_82a7bf175e9bcd40f142888889d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP CONSTRAINT "FK_82a7bf175e9bcd40f142888889d"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP CONSTRAINT "FK_750ed8df8067df034342c1af1fe"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP COLUMN "SOH_id"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP CONSTRAINT "PK_a693b37099d9587f2c808669348"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "SOI_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD "Products" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD CONSTRAINT "PK_6a579db46b4c1483c4cf8d718e9" PRIMARY KEY ("Products")`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD "SOHs" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP CONSTRAINT "PK_6a579db46b4c1483c4cf8d718e9"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD CONSTRAINT "PK_cbfad306973a889f91d78e6cbe3" PRIMARY KEY ("SOHs", "Products")`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "sOIProductProducts" integer`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "sOIProductSOHs" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD CONSTRAINT "FK_9f50b61a8eda5dac410e30c06d8" FOREIGN KEY ("SOI_id", "SOI_id") REFERENCES "sale_order_item"("Products","SOHs") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_e50fa90dde1ccc766aa3d527063" FOREIGN KEY ("sOIProductProducts", "sOIProductSOHs") REFERENCES "sale_order_item"("Products","SOHs") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
