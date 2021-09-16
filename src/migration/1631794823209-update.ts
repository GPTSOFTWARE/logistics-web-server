import {MigrationInterface, QueryRunner} from "typeorm";

export class update1631794823209 implements MigrationInterface {
    name = 'update1631794823209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "delivery_order" ("id" SERIAL NOT NULL, "saleOrderId" integer NOT NULL, "deliveryId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_08f144cd9889759426ab37c358e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_method" ("id" SERIAL NOT NULL, "codePayment" character varying NOT NULL, "namePayment" character varying NOT NULL, CONSTRAINT "PK_7744c2b2dd932c9cf42f2b9bc3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "quantity" integer, "order_id" integer, "unit" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_order" ("updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" integer, "createdBy" integer, "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "customerName" character varying NOT NULL, "customerAddress" character varying NOT NULL, "customerPhone" character varying NOT NULL, "receiverName" character varying NOT NULL, "receiverAddress" character varying NOT NULL, "receiverPhone" character varying NOT NULL, "typeShip" "sale_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn', "isFreeShip" boolean NOT NULL, "totalPrice" integer NOT NULL, "notes" character varying NOT NULL, "type" integer, "payment" integer, "driver" integer, CONSTRAINT "PK_6f16972488e48db5935eae6011f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2" FOREIGN KEY ("saleOrderId") REFERENCES "sale_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_18cb133e08962a8241105a84164" FOREIGN KEY ("deliveryId") REFERENCES "delivery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9849f0d8ce095e50e752616f691" FOREIGN KEY ("order_id") REFERENCES "sale_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_1ea2fe2f0067a2556a2ec7e70bd" FOREIGN KEY ("unit") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_d9693800dfc2492a5a87e69caed" FOREIGN KEY ("type") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_5f3eaaa5869ececfe8c6cdb6364" FOREIGN KEY ("payment") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_42774fe652b9c84e01215c57606" FOREIGN KEY ("driver") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_42774fe652b9c84e01215c57606"`);
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_5f3eaaa5869ececfe8c6cdb6364"`);
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_d9693800dfc2492a5a87e69caed"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_1ea2fe2f0067a2556a2ec7e70bd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9849f0d8ce095e50e752616f691"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_18cb133e08962a8241105a84164"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2"`);
        await queryRunner.query(`DROP TABLE "sale_order"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TABLE "payment_method"`);
        await queryRunner.query(`DROP TABLE "delivery_order"`);
    }

}
