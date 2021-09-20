import {MigrationInterface, QueryRunner} from "typeorm";

export class update11632137662683 implements MigrationInterface {
    name = 'update11632137662683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "job" ("id" SERIAL NOT NULL, "nameJob" character varying NOT NULL, "salaryBefore" numeric NOT NULL, "salaryAfter" numeric NOT NULL, "degree" character varying NOT NULL, "address" character varying NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "job"`);
    }

}
