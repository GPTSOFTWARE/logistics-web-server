import {MigrationInterface, QueryRunner} from "typeorm";

export class update1632053186330 implements MigrationInterface {
    name = 'update1632053186330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "quantity" integer, "order_id" integer, "unit_id" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_order" ("id" SERIAL NOT NULL, "saleOrderId" integer NOT NULL, "statusId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "typeShip" "delivery_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn', "plannedTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "driver_id" integer, CONSTRAINT "PK_08f144cd9889759426ab37c358e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_order" ("updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" integer, "createdBy" integer, "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "customerName" character varying NOT NULL, "customerAddress" character varying NOT NULL, "customerPhone" character varying NOT NULL, "receiverName" character varying NOT NULL, "receiverAddress" character varying NOT NULL, "receiverPhone" character varying NOT NULL, "orderName" character varying NOT NULL, "customerType" "sale_order_customertype_enum" NOT NULL DEFAULT 'Khách Vãng Lai', "isFreeShip" boolean NOT NULL, "quantity" integer NOT NULL, "totalPrice" integer NOT NULL, "notes" character varying NOT NULL, "orderType" integer, "payment_id" integer, "unit_id" integer, CONSTRAINT "PK_6f16972488e48db5935eae6011f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9849f0d8ce095e50e752616f691" FOREIGN KEY ("order_id") REFERENCES "sale_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b15422982adca3bf53adfb535de" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_24144ec628ab2173a1c3ee19753" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2" FOREIGN KEY ("saleOrderId") REFERENCES "sale_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_76ddecfc2d77679e7ae5dae7ff8" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_d79c2b02580d86b7935bb6ea7a9" FOREIGN KEY ("orderType") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_6fb3e7adf419c53cc9fdc8f0bbd" FOREIGN KEY ("payment_id") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_def93257a0d33252d257cf47c5d" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_def93257a0d33252d257cf47c5d"`);
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_6fb3e7adf419c53cc9fdc8f0bbd"`);
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_d79c2b02580d86b7935bb6ea7a9"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_76ddecfc2d77679e7ae5dae7ff8"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_24144ec628ab2173a1c3ee19753"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b15422982adca3bf53adfb535de"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9849f0d8ce095e50e752616f691"`);
        await queryRunner.query(`DROP TABLE "sale_order"`);
        await queryRunner.query(`DROP TABLE "delivery_order"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
