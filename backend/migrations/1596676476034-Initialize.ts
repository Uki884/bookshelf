import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1596676476034 implements MigrationInterface {
    name = 'Initialize1596676476034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `book` DROP FOREIGN KEY `FK_cf4c76d5e5a38bf7bbe82a177e1`");
        await queryRunner.query("DROP INDEX `REL_cf4c76d5e5a38bf7bbe82a177e` ON `book`");
        await queryRunner.query("ALTER TABLE `book` CHANGE `bookPostionId` `bookPositionId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `book` ADD UNIQUE INDEX `IDX_00036ab855480d8b724eea37bc` (`bookPositionId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_00036ab855480d8b724eea37bc` ON `book` (`bookPositionId`)");
        await queryRunner.query("ALTER TABLE `book` ADD CONSTRAINT `FK_00036ab855480d8b724eea37bc1` FOREIGN KEY (`bookPositionId`) REFERENCES `book_position`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `book` DROP FOREIGN KEY `FK_00036ab855480d8b724eea37bc1`");
        await queryRunner.query("DROP INDEX `REL_00036ab855480d8b724eea37bc` ON `book`");
        await queryRunner.query("ALTER TABLE `book` DROP INDEX `IDX_00036ab855480d8b724eea37bc`");
        await queryRunner.query("ALTER TABLE `book` CHANGE `bookPositionId` `bookPostionId` int NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_cf4c76d5e5a38bf7bbe82a177e` ON `book` (`bookPostionId`)");
        await queryRunner.query("ALTER TABLE `book` ADD CONSTRAINT `FK_cf4c76d5e5a38bf7bbe82a177e1` FOREIGN KEY (`bookPostionId`) REFERENCES `book_position`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
