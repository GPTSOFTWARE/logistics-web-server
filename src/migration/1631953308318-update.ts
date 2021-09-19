import {MigrationInterface, QueryRunner} from "typeorm";

export class update1631953308318 implements MigrationInterface {
    name = 'update1631953308318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_order" ("id" SERIAL NOT NULL, "saleOrderId" integer NOT NULL, "statusId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "typeShip" "delivery_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn', "plannedTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "driver_id" integer, CONSTRAINT "PK_08f144cd9889759426ab37c358e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "isFreeShip" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_24144ec628ab2173a1c3ee19753" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2" FOREIGN KEY ("saleOrderId") REFERENCES "sale_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_76ddecfc2d77679e7ae5dae7ff8" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_76ddecfc2d77679e7ae5dae7ff8"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_24144ec628ab2173a1c3ee19753"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "createdAt" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "updatedAt" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "createdAt" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "updatedAt" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "isFreeShip"`);
        await queryRunner.query(`DROP TABLE "delivery_order"`);
        await queryRunner.query(`DROP TABLE "status"`);
    }

}
