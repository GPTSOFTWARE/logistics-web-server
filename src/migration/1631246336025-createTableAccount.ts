import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableAccount1631246336025 implements MigrationInterface {
    name = 'createTableAccount1631246336025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "FK_dd524e2e1185571b43756a9a992"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_a14c79d67133bb0df4a71807a74"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_05b8003b6a5c6a9b16cb31fea2a"`);
        await queryRunner.query(`ALTER TABLE "public"."message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_a14c79d67133bb0df4a71807a74"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_05b8003b6a5c6a9b16cb31fea2a"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" DROP CONSTRAINT "FK_dd524e2e1185571b43756a9a992"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "account_role_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD CONSTRAINT "FK_05b8003b6a5c6a9b16cb31fea2a" FOREIGN KEY ("user1_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD CONSTRAINT "FK_a14c79d67133bb0df4a71807a74" FOREIGN KEY ("user2_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order_header" ADD CONSTRAINT "FK_dd524e2e1185571b43756a9a992" FOREIGN KEY ("User_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
