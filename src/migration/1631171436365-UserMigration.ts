import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1631171436365 implements MigrationInterface {
    name = 'UserMigration1631171436365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_order_header" ("id" SERIAL NOT NULL, "idProduct" SERIAL NOT NULL, "idSOI" SERIAL NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_86c555d98af628f4b2c185c549a" PRIMARY KEY ("id", "idProduct", "idSOI"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "thumbnails" character varying NOT NULL, "description" character varying NOT NULL, "sOHsId" integer, "sOHsIdProduct" integer, "sOHsIdSOI" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_order_i" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "totalPrice" integer NOT NULL, "totalQuantity" integer NOT NULL, "sOHsId" integer, "sOHsIdProduct" integer, "sOHsIdSOI" integer, CONSTRAINT "PK_897a3f28394bf226a876d8759ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "fullname" character varying(50) NOT NULL, "phone" character varying(11) NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0cab77eebd278e858650840e519" FOREIGN KEY ("sOHsId", "sOHsIdProduct", "sOHsIdSOI") REFERENCES "sale_order_header"("id","idProduct","idSOI") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order_i" ADD CONSTRAINT "FK_0ae5da6fa5083ae151d296bad32" FOREIGN KEY ("sOHsId", "sOHsIdProduct", "sOHsIdSOI") REFERENCES "sale_order_header"("id","idProduct","idSOI") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_order_i" DROP CONSTRAINT "FK_0ae5da6fa5083ae151d296bad32"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0cab77eebd278e858650840e519"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "sale_order_i"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "sale_order_header"`);
    }

}
