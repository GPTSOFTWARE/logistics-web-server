import {MigrationInterface, QueryRunner} from "typeorm";

export class addHistoryDelivery1632554715531 implements MigrationInterface {
    name = 'addHistoryDelivery1632554715531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "delivery_history" ("id" SERIAL NOT NULL, "deliveryOrderId" integer NOT NULL, "status" character varying NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" integer, "createdBy" integer, "deletedAt" TIMESTAMP, CONSTRAINT "PK_b51c834c69b23c838f72729960c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_order" ("id" SERIAL NOT NULL, "saleOrderId" integer NOT NULL, "statusId" integer NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" integer, "createdBy" integer, "deletedAt" TIMESTAMP, "typeShip" "delivery_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn', "plannedTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "driverid" integer, CONSTRAINT "PK_08f144cd9889759426ab37c358e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "delivery_history" ADD CONSTRAINT "FK_e3abc924d0635763a4c438482a0" FOREIGN KEY ("deliveryOrderId") REFERENCES "delivery_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_da91d6a2a57c882b892e6e57069" FOREIGN KEY ("driverid") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2" FOREIGN KEY ("saleOrderId") REFERENCES "sale_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_76ddecfc2d77679e7ae5dae7ff8" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_76ddecfc2d77679e7ae5dae7ff8"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_da91d6a2a57c882b892e6e57069"`);
        await queryRunner.query(`ALTER TABLE "delivery_history" DROP CONSTRAINT "FK_e3abc924d0635763a4c438482a0"`);
        await queryRunner.query(`DROP TABLE "delivery_order"`);
        await queryRunner.query(`DROP TABLE "delivery_history"`);
    }

}
