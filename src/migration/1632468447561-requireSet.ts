import {MigrationInterface, QueryRunner} from "typeorm";

export class requireSet1632468447561 implements MigrationInterface {
    name = 'requireSet1632468447561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "quantity" integer, "order_id" integer, "unit_id" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "phone" character varying(11) NOT NULL, "age" integer NOT NULL, "idenityCard" character varying(20) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_da2de2f38fab884b357af06ef7d" UNIQUE ("idenityCard"), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_order" ("id" SERIAL NOT NULL, "saleOrderId" integer NOT NULL, "statusId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "typeShip" "delivery_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn', "plannedTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "driver_id" integer, CONSTRAINT "PK_08f144cd9889759426ab37c358e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_method" ("id" SERIAL NOT NULL, "codePayment" character varying(20) NOT NULL, "namePayment" character varying(100) NOT NULL, CONSTRAINT "PK_7744c2b2dd932c9cf42f2b9bc3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_order" ("updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" integer, "createdBy" integer, "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "customerName" character varying(100) NOT NULL, "customerAddress" character varying NOT NULL, "customerPhone" character varying(11) NOT NULL, "receiverName" character varying(100) NOT NULL, "receiverAddress" character varying NOT NULL, "receiverPhone" character varying(11) NOT NULL, "orderName" character varying(100), "customerType" "sale_order_customertype_enum" NOT NULL DEFAULT 'Khách Vãng Lai', "isFreeShip" boolean NOT NULL, "quantity" integer NOT NULL, "totalPrice" double precision NOT NULL, "notes" text, "orderType" integer, "payment_id" integer, "unit_id" integer, CONSTRAINT "PK_6f16972488e48db5935eae6011f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "fullname" character varying(50) NOT NULL, "email" character varying(30), "phone" character varying(11), "title" character varying NOT NULL, "text" text NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job" ("id" SERIAL NOT NULL, "nameJob" character varying NOT NULL, "salaryBefore" numeric NOT NULL, "salaryAfter" numeric NOT NULL, "degree" character varying(50), "address" text NOT NULL, "position" character varying(50) NOT NULL, "quantity" integer NOT NULL, "require" text NOT NULL, "thumbnails" character varying NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5844969f44c4a07e50503e50c" ON "job" ("nameJob") `);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "content" text NOT NULL, "see" boolean NOT NULL DEFAULT false, "sender_id" integer, "chat_id" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request_order" ("id" SERIAL NOT NULL, "fullname" character varying(100) NOT NULL, "phone" character varying(11) NOT NULL, "email" character varying(100), "address" text NOT NULL, "typeProduct" character varying NOT NULL, "weight" numeric NOT NULL, "fastShip" boolean NOT NULL, "note" text NOT NULL, CONSTRAINT "PK_ba6b6b4786462745d3212e1cc7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9849f0d8ce095e50e752616f691" FOREIGN KEY ("order_id") REFERENCES "sale_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b15422982adca3bf53adfb535de" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_24144ec628ab2173a1c3ee19753" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2" FOREIGN KEY ("saleOrderId") REFERENCES "sale_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_76ddecfc2d77679e7ae5dae7ff8" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_d79c2b02580d86b7935bb6ea7a9" FOREIGN KEY ("orderType") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_6fb3e7adf419c53cc9fdc8f0bbd" FOREIGN KEY ("payment_id") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_def93257a0d33252d257cf47c5d" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_859ffc7f95098efb4d84d50c632" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_859ffc7f95098efb4d84d50c632"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_def93257a0d33252d257cf47c5d"`);
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_6fb3e7adf419c53cc9fdc8f0bbd"`);
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_d79c2b02580d86b7935bb6ea7a9"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_76ddecfc2d77679e7ae5dae7ff8"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_684ffe96eb391eed0022ae2afd2"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_24144ec628ab2173a1c3ee19753"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b15422982adca3bf53adfb535de"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9849f0d8ce095e50e752616f691"`);
        await queryRunner.query(`DROP TABLE "request_order"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP INDEX "IDX_b5844969f44c4a07e50503e50c"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "sale_order"`);
        await queryRunner.query(`DROP TABLE "payment_method"`);
        await queryRunner.query(`DROP TABLE "delivery_order"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
