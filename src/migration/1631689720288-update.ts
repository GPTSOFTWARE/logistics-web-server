import {MigrationInterface, QueryRunner} from "typeorm";

export class update1631689720288 implements MigrationInterface {
    name = 'update1631689720288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "delivery" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying(11) NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "weight" numeric NOT NULL, "price" numeric NOT NULL, "quantity" integer, "order_id" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_order" ("updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" integer, "createdBy" integer, "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "from_name" character varying NOT NULL, "from_phone" character varying NOT NULL, "from_address" character varying NOT NULL, "to_name" character varying NOT NULL, "to_phone" character varying NOT NULL, "to_address" character varying NOT NULL, "typeShip" "sale_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn', "isFreeShip" boolean NOT NULL, "totalPrice" integer NOT NULL, "notes" character varying NOT NULL, "type" integer, "driver" integer, CONSTRAINT "PK_6f16972488e48db5935eae6011f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_order_deliveries_delivery" ("saleOrderId" integer NOT NULL, "deliveryId" integer NOT NULL, CONSTRAINT "PK_92dabab74f0de9fa9de3f8b033e" PRIMARY KEY ("saleOrderId", "deliveryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_614b0cb615c73b5af24cbe2f02" ON "sale_order_deliveries_delivery" ("saleOrderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c69996271ec85d2c5bb0379c6f" ON "sale_order_deliveries_delivery" ("deliveryId") `);
        await queryRunner.query(`ALTER TABLE "public"."customer" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "public"."customer" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "public"."customer" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "public"."customer" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9849f0d8ce095e50e752616f691" FOREIGN KEY ("order_id") REFERENCES "sale_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_d9693800dfc2492a5a87e69caed" FOREIGN KEY ("type") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_42774fe652b9c84e01215c57606" FOREIGN KEY ("driver") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order_deliveries_delivery" ADD CONSTRAINT "FK_614b0cb615c73b5af24cbe2f02c" FOREIGN KEY ("saleOrderId") REFERENCES "sale_order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sale_order_deliveries_delivery" ADD CONSTRAINT "FK_c69996271ec85d2c5bb0379c6fc" FOREIGN KEY ("deliveryId") REFERENCES "delivery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_order_deliveries_delivery" DROP CONSTRAINT "FK_c69996271ec85d2c5bb0379c6fc"`);
        await queryRunner.query(`ALTER TABLE "sale_order_deliveries_delivery" DROP CONSTRAINT "FK_614b0cb615c73b5af24cbe2f02c"`);
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_42774fe652b9c84e01215c57606"`);
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_d9693800dfc2492a5a87e69caed"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9849f0d8ce095e50e752616f691"`);
        await queryRunner.query(`ALTER TABLE "public"."customer" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."customer" ADD "fullname" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."customer" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."customer" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_c69996271ec85d2c5bb0379c6f"`);
        await queryRunner.query(`DROP INDEX "IDX_614b0cb615c73b5af24cbe2f02"`);
        await queryRunner.query(`DROP TABLE "sale_order_deliveries_delivery"`);
        await queryRunner.query(`DROP TABLE "sale_order"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TABLE "delivery"`);
    }

}
