import {MigrationInterface, QueryRunner} from "typeorm";

export class update21631843274498 implements MigrationInterface {
    name = 'update21631843274498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_835dcb6c01f07cd73a1756d478b"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_42774fe652b9c84e01215c57606"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_7bd6c2e62480797cf949c51e8cb"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_e707143f907c1e9592efe603d4f"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "categories"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "paymentMethod"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "driver"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "orderType" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "payment_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "unit_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "driver_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_d79c2b02580d86b7935bb6ea7a9" FOREIGN KEY ("orderType") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_6fb3e7adf419c53cc9fdc8f0bbd" FOREIGN KEY ("payment_id") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_def93257a0d33252d257cf47c5d" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_0bf6aef2812f3367ab71cf0f82b" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_0bf6aef2812f3367ab71cf0f82b"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_def93257a0d33252d257cf47c5d"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_6fb3e7adf419c53cc9fdc8f0bbd"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP CONSTRAINT "FK_d79c2b02580d86b7935bb6ea7a9"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "driver_id"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "unit_id"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" DROP COLUMN "orderType"`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "driver" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "unit" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "paymentMethod" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD "categories" integer`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_e707143f907c1e9592efe603d4f" FOREIGN KEY ("paymentMethod") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_7bd6c2e62480797cf949c51e8cb" FOREIGN KEY ("unit") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_42774fe652b9c84e01215c57606" FOREIGN KEY ("driver") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."sale_order" ADD CONSTRAINT "FK_835dcb6c01f07cd73a1756d478b" FOREIGN KEY ("categories") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
