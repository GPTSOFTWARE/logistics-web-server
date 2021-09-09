import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserAndOrder1631187920570 implements MigrationInterface {
    name = 'UpdateUserAndOrder1631187920570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "FK_9ba57a71a8085afb2073b1ec96a"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" RENAME COLUMN "SOH_id" TO "User_id"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD CONSTRAINT "FK_dd524e2e1185571b43756a9a992" FOREIGN KEY ("User_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "FK_dd524e2e1185571b43756a9a992"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" RENAME COLUMN "User_id" TO "SOH_id"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD CONSTRAINT "FK_9ba57a71a8085afb2073b1ec96a" FOREIGN KEY ("SOH_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
