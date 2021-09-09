import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserAndOrder1631187748525 implements MigrationInterface {
    name = 'UpdateUserAndOrder1631187748525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_account_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user_account" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "fullname" character varying(50) NOT NULL, "phone" character varying(11) NOT NULL, "role" "user_account_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD "SOH_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD CONSTRAINT "FK_9ba57a71a8085afb2073b1ec96a" FOREIGN KEY ("SOH_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "FK_9ba57a71a8085afb2073b1ec96a"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP COLUMN "SOH_id"`);
        await queryRunner.query(`DROP TABLE "user_account"`);
        await queryRunner.query(`DROP TYPE "user_account_role_enum"`);
    }

}
