import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTokensEntityAndRelations1731408127548 implements MigrationInterface {
    name = 'AddTokensEntityAndRelations1731408127548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accessToken" text NOT NULL, "refreshToken" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_907e9dc1bcb8685553c78b25b8" UNIQUE ("user_id"), CONSTRAINT "PK_47b543436b0189860e4e01c7e14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Tokens" ADD CONSTRAINT "FK_907e9dc1bcb8685553c78b25b8f" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tokens" DROP CONSTRAINT "FK_907e9dc1bcb8685553c78b25b8f"`);
        await queryRunner.query(`DROP TABLE "Tokens"`);
    }

}
