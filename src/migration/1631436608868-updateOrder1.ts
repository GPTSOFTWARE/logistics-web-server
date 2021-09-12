import {MigrationInterface, QueryRunner} from "typeorm";

export class updateOrder11631436608868 implements MigrationInterface {
    name = 'updateOrder11631436608868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP CONSTRAINT "FK_58ecb7d83809395c45360e67ffc"`);
        await queryRunner.query(`ALTER TABLE "public"."product" RENAME COLUMN "thumbnails" TO "order_id"`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" SERIAL NOT NULL, "from_name" character varying NOT NULL, "from_phone" character varying NOT NULL, "from_address" character varying NOT NULL, "to_name" character varying NOT NULL, "to_phone" character varying NOT NULL, "to_address" character varying NOT NULL, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery" ("status_id" SERIAL NOT NULL, "status_name" character varying NOT NULL, CONSTRAINT "PK_7402e08a6496ff740a56399e8b6" PRIMARY KEY ("status_id"))`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP COLUMN "productid"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "totalQuantity"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."sale_order_header_type_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "pickDate"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "return_name"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "return_phone"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "return_address"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "to_name"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "to_phone"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "to_address"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "order_details" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD CONSTRAINT "UQ_fd1c2e6bea043503dd867e6af5f" UNIQUE ("order_details")`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "order_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_9849f0d8ce095e50e752616f691" FOREIGN KEY ("order_id") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD CONSTRAINT "FK_fd1c2e6bea043503dd867e6af5f" FOREIGN KEY ("order_details") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "FK_fd1c2e6bea043503dd867e6af5f"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_9849f0d8ce095e50e752616f691"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "order_id" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "UQ_fd1c2e6bea043503dd867e6af5f"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "order_details"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "to_address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "to_phone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "to_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "return_address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "return_phone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "return_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "pickDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."sale_order_header_type_enum" AS ENUM('giao hàng nhanh', 'giao hàng tiêu chuẩn')`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "type" "public"."sale_order_header_type_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn'`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "totalQuantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "totalPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD "productid" integer`);
        await queryRunner.query(`DROP TABLE "delivery"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`ALTER TABLE "public"."product" RENAME COLUMN "order_id" TO "thumbnails"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD CONSTRAINT "FK_58ecb7d83809395c45360e67ffc" FOREIGN KEY ("productid") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
