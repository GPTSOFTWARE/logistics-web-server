import {MigrationInterface, QueryRunner} from "typeorm";

export class update41631671002157 implements MigrationInterface {
    name = 'update41631671002157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_755796eb8753933f61e3c339beb"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order_header" DROP CONSTRAINT "FK_89599a18dd7a0bc9a6095878874"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "order_value"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "ordersId"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order_header" DROP COLUMN "deliveriesId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."delivery_order_header" ADD "deliveriesId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "ordersId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "order_value" integer`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order_header" ADD CONSTRAINT "FK_89599a18dd7a0bc9a6095878874" FOREIGN KEY ("deliveriesId") REFERENCES "delivery_order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_755796eb8753933f61e3c339beb" FOREIGN KEY ("ordersId") REFERENCES "delivery_order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
