import {MigrationInterface, QueryRunner} from "typeorm";

export class update1631508607203 implements MigrationInterface {
    name = 'update1631508607203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_order" ("updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" integer, "createdBy" integer, "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "from_name" character varying NOT NULL, "from_phone" character varying NOT NULL, "from_address" character varying NOT NULL, "to_name" character varying NOT NULL, "to_phone" character varying NOT NULL, "to_address" character varying NOT NULL, "typeShip" "sale_order_typeship_enum" NOT NULL DEFAULT 'giao hàng tiêu chuẩn', "isFreeShip" boolean NOT NULL, "order_value" integer, CONSTRAINT "PK_6f16972488e48db5935eae6011f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_order_item" ("id" SERIAL NOT NULL, "totalPrice" integer NOT NULL, "totalQuantity" integer NOT NULL, "orderIdId" integer, CONSTRAINT "PK_a693b37099d9587f2c808669348" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "weight" numeric NOT NULL, "price" numeric NOT NULL, "quantity" integer, "description" text, "category" integer, "order_id" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_order_header" ("id" SERIAL NOT NULL, "note" character varying NOT NULL, CONSTRAINT "PK_0ae3ebe595946a9ac9597d22c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sale_order_item" ADD CONSTRAINT "FK_d47234ebc9874b7226df20d2b07" FOREIGN KEY ("orderIdId") REFERENCES "sale_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d71ac3a30622a475df871b55130" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9849f0d8ce095e50e752616f691" FOREIGN KEY ("order_id") REFERENCES "sale_order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9849f0d8ce095e50e752616f691"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d71ac3a30622a475df871b55130"`);
        await queryRunner.query(`ALTER TABLE "sale_order_item" DROP CONSTRAINT "FK_d47234ebc9874b7226df20d2b07"`);
        await queryRunner.query(`DROP TABLE "sale_order_header"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "sale_order_item"`);
        await queryRunner.query(`DROP TABLE "sale_order"`);
    }

}
