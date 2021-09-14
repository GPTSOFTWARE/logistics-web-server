import {MigrationInterface, QueryRunner} from "typeorm";

export class update1631617761710 implements MigrationInterface {
    name = 'update1631617761710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_order" ("updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" integer, "createdBy" integer, "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "from_name" character varying NOT NULL, "from_phone" character varying NOT NULL, "from_address" character varying NOT NULL, "to_name" character varying NOT NULL, "to_phone" character varying NOT NULL, "to_address" character varying NOT NULL, "typeShip" "sale_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn', "unit" character varying NOT NULL, "isFreeShip" boolean NOT NULL, "order_value" integer, "ordersId" integer, CONSTRAINT "PK_6f16972488e48db5935eae6011f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" integer, "createdBy" integer, "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "weight" numeric NOT NULL, "price" numeric NOT NULL, "quantity" integer, "description" text, "category" integer, "orderIdId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sale_order" ADD CONSTRAINT "FK_755796eb8753933f61e3c339beb" FOREIGN KEY ("ordersId") REFERENCES "delivery_order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d71ac3a30622a475df871b55130" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d9a27f8e64dfc0087af7d2f9ad7" FOREIGN KEY ("orderIdId") REFERENCES "sale_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d9a27f8e64dfc0087af7d2f9ad7"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d71ac3a30622a475df871b55130"`);
        await queryRunner.query(`ALTER TABLE "sale_order" DROP CONSTRAINT "FK_755796eb8753933f61e3c339beb"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "sale_order"`);
    }

}
