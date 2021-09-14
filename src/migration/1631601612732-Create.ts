import {MigrationInterface, QueryRunner} from "typeorm";

export class Create1631601612732 implements MigrationInterface {
    name = 'Create1631601612732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "ordersId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_755796eb8753933f61e3c339beb" FOREIGN KEY ("ordersId") REFERENCES "delivery_order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_755796eb8753933f61e3c339beb"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "ordersId"`);
    }

}
