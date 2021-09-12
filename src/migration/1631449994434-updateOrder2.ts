import {MigrationInterface, QueryRunner} from "typeorm";

export class updateOrder21631449994434 implements MigrationInterface {
    name = 'updateOrder21631449994434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "FK_f80ceb953c4d2b3f4c9b08de7eb"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP CONSTRAINT "FK_750ed8df8067df034342c1af1fe"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" DROP COLUMN "SOH_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD "SOH_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "note" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_item" ADD CONSTRAINT "FK_750ed8df8067df034342c1af1fe" FOREIGN KEY ("SOH_id") REFERENCES "sale_order_header"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD CONSTRAINT "FK_f80ceb953c4d2b3f4c9b08de7eb" FOREIGN KEY ("user_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
