import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1678776658054 implements MigrationInterface {
    name = 'myInit1678776658054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "totalTime" character varying NOT NULL, "artist" character varying, "tag" character varying, "title" character varying, "artistInfoName" character varying, "description" character varying, "visited" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "playlist"`);
    }

}
