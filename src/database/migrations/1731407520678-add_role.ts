import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRole1731407520678 implements MigrationInterface {
    name = 'AddRole1731407520678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "role" text NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "role"`);
    }

}
