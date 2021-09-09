import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTableCityAndDistrict1631188974111 implements MigrationInterface {
    name = 'AddTableCityAndDistrict1631188974111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "district" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "cityId" integer, CONSTRAINT "PK_ee5cb6fd5223164bb87ea693f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "cityName" character varying(255) NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_148f1c944d0fec4114a54984da1" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_148f1c944d0fec4114a54984da1"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "district"`);
    }

}
