import {MigrationInterface, QueryRunner} from "typeorm";

export class update101632661683851 implements MigrationInterface {
    name = 'update101632661683851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "job" ("id" SERIAL NOT NULL, "nameJob" character varying NOT NULL, "salaryBefore" numeric NOT NULL, "salaryAfter" numeric NOT NULL, "degree" character varying(50), "address" text NOT NULL, "position" character varying(50) NOT NULL, "quantity" integer NOT NULL, "require" text NOT NULL, "thumbnails" character varying NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "expirationDate" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5844969f44c4a07e50503e50c" ON "job" ("nameJob") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_b5844969f44c4a07e50503e50c"`);
        await queryRunner.query(`DROP TABLE "job"`);
    }

}
