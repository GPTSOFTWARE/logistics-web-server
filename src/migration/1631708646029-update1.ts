import {MigrationInterface, QueryRunner} from "typeorm";

export class update11631708646029 implements MigrationInterface {
    name = 'update11631708646029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "delivery_order" ("id" SERIAL NOT NULL, "saleOrderId" integer NOT NULL, "deliveryId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_08f144cd9889759426ab37c358e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2" FOREIGN KEY ("saleOrderId") REFERENCES "sale_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_18cb133e08962a8241105a84164" FOREIGN KEY ("deliveryId") REFERENCES "delivery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_18cb133e08962a8241105a84164"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2"`);
        await queryRunner.query(`DROP TABLE "delivery_order"`);
    }

}
