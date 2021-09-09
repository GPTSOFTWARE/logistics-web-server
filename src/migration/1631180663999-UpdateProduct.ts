import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateProduct1631180663999 implements MigrationInterface {
    name = 'UpdateProduct1631180663999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_order_header" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "totalPrice" integer NOT NULL, "totalQuantity" integer NOT NULL, "SOI_id" integer, CONSTRAINT "PK_0ae3ebe595946a9ac9597d22c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_order_item" ("SOHs" SERIAL NOT NULL, "Products" SERIAL NOT NULL, "totalPrice" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_cbfad306973a889f91d78e6cbe3" PRIMARY KEY ("SOHs", "Products"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "thumbnails" character varying NOT NULL, "description" character varying NOT NULL, "sOIProductSOHs" integer, "sOIProductProducts" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sale_order_header" ADD CONSTRAINT "FK_9f50b61a8eda5dac410e30c06d8" FOREIGN KEY ("SOI_id", "SOI_id") REFERENCES "sale_order_item"("SOHs","Products") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_e50fa90dde1ccc766aa3d527063" FOREIGN KEY ("sOIProductSOHs", "sOIProductProducts") REFERENCES "sale_order_item"("SOHs","Products") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_e50fa90dde1ccc766aa3d527063"`);
        await queryRunner.query(`ALTER TABLE "sale_order_header" DROP CONSTRAINT "FK_9f50b61a8eda5dac410e30c06d8"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "sale_order_item"`);
        await queryRunner.query(`DROP TABLE "sale_order_header"`);
    }

}
