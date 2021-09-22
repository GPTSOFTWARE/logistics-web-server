import {MigrationInterface, QueryRunner} from "typeorm";

export class update31632313938721 implements MigrationInterface {
    name = 'update31632313938721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."account_role_enum" RENAME TO "account_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."account_role_enum" AS ENUM('admin', 'user', 'manage')`);
        await queryRunner.query(`ALTER TABLE "public"."account" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."account" ALTER COLUMN "role" TYPE "public"."account_role_enum" USING "role"::"text"::"public"."account_role_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."account" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."account_role_enum_old"`);
        await queryRunner.query(`CREATE INDEX "IDX_b5844969f44c4a07e50503e50c" ON "public"."job" ("nameJob") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b5844969f44c4a07e50503e50c"`);
        await queryRunner.query(`CREATE TYPE "public"."account_role_enum_old" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "public"."account" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."account" ALTER COLUMN "role" TYPE "public"."account_role_enum_old" USING "role"::"text"::"public"."account_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "public"."account" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."account_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."account_role_enum_old" RENAME TO "account_role_enum"`);
    }

}
