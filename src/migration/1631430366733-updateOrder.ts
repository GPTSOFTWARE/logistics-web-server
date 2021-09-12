import {MigrationInterface, QueryRunner} from "typeorm";

export class updateOrder1631430366733 implements MigrationInterface {
    name = 'updateOrder1631430366733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "return_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "return_phone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "return_address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "to_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "to_phone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "to_address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "note" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "weight" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "category" integer`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_d71ac3a30622a475df871b55130" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_d71ac3a30622a475df871b55130"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "to_address"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "to_phone"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "to_name"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "return_address"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "return_phone"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "return_name"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
