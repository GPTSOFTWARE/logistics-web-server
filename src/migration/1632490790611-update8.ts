import {MigrationInterface, QueryRunner} from "typeorm";

export class update81632490790611 implements MigrationInterface {
    name = 'update81632490790611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" DROP CONSTRAINT "FK_24144ec628ab2173a1c3ee19753"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" RENAME COLUMN "driver_id" TO "driverid"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" ADD CONSTRAINT "FK_da91d6a2a57c882b892e6e57069" FOREIGN KEY ("driverid") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" DROP CONSTRAINT "FK_da91d6a2a57c882b892e6e57069"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" RENAME COLUMN "driverid" TO "driver_id"`);
        await queryRunner.query(`ALTER TABLE "public"."delivery_order" ADD CONSTRAINT "FK_24144ec628ab2173a1c3ee19753" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
