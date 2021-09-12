import {MigrationInterface, QueryRunner} from "typeorm";

export class updateOrder31631454870370 implements MigrationInterface {
    name = 'updateOrder31631454870370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_9849f0d8ce095e50e752616f691"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "FK_fd1c2e6bea043503dd867e6af5f"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" RENAME COLUMN "order_details" TO "note"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" RENAME CONSTRAINT "UQ_fd1c2e6bea043503dd867e6af5f" TO "UQ_8141905f643ba62144e9a50fd97"`);
        await queryRunner.query(`CREATE TYPE "sale_order_typeship_enum" AS ENUM('giao hàng nhanh', 'giao hàng tiêu chuẩn')`);
        await queryRunner.query(`CREATE TABLE "sale_order" ("updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" integer, "createdBy" integer, "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "from_name" character varying NOT NULL, "from_phone" character varying NOT NULL, "from_address" character varying NOT NULL, "to_name" character varying NOT NULL, "to_phone" character varying NOT NULL, "to_address" character varying NOT NULL, "typeShip" "sale_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn', "isFreeShip" boolean NOT NULL, "order_value" integer, CONSTRAINT "PK_6f16972488e48db5935eae6011f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "UQ_8141905f643ba62144e9a50fd97"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "note" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_9849f0d8ce095e50e752616f691" FOREIGN KEY ("order_id") REFERENCES "sale_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_9849f0d8ce095e50e752616f691"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "note" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD CONSTRAINT "UQ_8141905f643ba62144e9a50fd97" UNIQUE ("note")`);
        await queryRunner.query(`DROP TABLE "sale_order"`);
        await queryRunner.query(`DROP TYPE "sale_order_typeship_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" RENAME CONSTRAINT "UQ_8141905f643ba62144e9a50fd97" TO "UQ_fd1c2e6bea043503dd867e6af5f"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" RENAME COLUMN "note" TO "order_details"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD CONSTRAINT "FK_fd1c2e6bea043503dd867e6af5f" FOREIGN KEY ("order_details") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_9849f0d8ce095e50e752616f691" FOREIGN KEY ("order_id") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
