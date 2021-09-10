import {MigrationInterface, QueryRunner} from "typeorm";

export class initHeroku1631217343852 implements MigrationInterface {
    name = 'initHeroku1631217343852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "district" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "cityId" integer, CONSTRAINT "PK_ee5cb6fd5223164bb87ea693f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "cityName" character varying(255) NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("updatedAt" TIMESTAMP, "createdAt" TIMESTAMP, "updatedBy" integer, "createdBy" integer NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "thumbnails" character varying NOT NULL, "description" character varying NOT NULL, "sOIProductSOHs" integer, "sOIProductProducts" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_order_item" ("SOHs" SERIAL NOT NULL, "Products" SERIAL NOT NULL, "totalPrice" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_cbfad306973a889f91d78e6cbe3" PRIMARY KEY ("SOHs", "Products"))`);
        await queryRunner.query(`CREATE TABLE "sale_order_header" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "totalPrice" integer NOT NULL, "totalQuantity" integer NOT NULL, "SOI_id" integer, "User_id" integer, CONSTRAINT "PK_0ae3ebe595946a9ac9597d22c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "fullname" character varying(50) NOT NULL, "phone" character varying(11) NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chats" ("updatedAt" TIMESTAMP, "createdAt" TIMESTAMP, "updatedBy" integer, "createdBy" integer NOT NULL, "id" SERIAL NOT NULL, "user1_id" integer, "user2_id" integer, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "see" boolean NOT NULL DEFAULT false, "sender_id" integer, "chat_id" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_148f1c944d0fec4114a54984da1" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_e50fa90dde1ccc766aa3d527063" FOREIGN KEY ("sOIProductSOHs", "sOIProductProducts") REFERENCES "sale_order_item"("SOHs","Products") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order_header" ADD CONSTRAINT "FK_9f50b61a8eda5dac410e30c06d8" FOREIGN KEY ("SOI_id", "SOI_id") REFERENCES "sale_order_item"("SOHs","Products") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_order_header" ADD CONSTRAINT "FK_dd524e2e1185571b43756a9a992" FOREIGN KEY ("User_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_05b8003b6a5c6a9b16cb31fea2a" FOREIGN KEY ("user1_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_a14c79d67133bb0df4a71807a74" FOREIGN KEY ("user2_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_859ffc7f95098efb4d84d50c632" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_859ffc7f95098efb4d84d50c632"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_a14c79d67133bb0df4a71807a74"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_05b8003b6a5c6a9b16cb31fea2a"`);
        await queryRunner.query(`ALTER TABLE "sale_order_header" DROP CONSTRAINT "FK_dd524e2e1185571b43756a9a992"`);
        await queryRunner.query(`ALTER TABLE "sale_order_header" DROP CONSTRAINT "FK_9f50b61a8eda5dac410e30c06d8"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_e50fa90dde1ccc766aa3d527063"`);
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_148f1c944d0fec4114a54984da1"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "chats"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "sale_order_header"`);
        await queryRunner.query(`DROP TABLE "sale_order_item"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "district"`);
    }

}
