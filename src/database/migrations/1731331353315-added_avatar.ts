import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedAvatar1731331353315 implements MigrationInterface {
    name = 'AddedAvatar1731331353315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "avatar" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "avatar"`);
    }

}
