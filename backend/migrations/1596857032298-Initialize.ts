import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1596857032298 implements MigrationInterface {
    name = 'Initialize1596857032298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `auth0Id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `book_shelf` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `book_position` (`id` int NOT NULL AUTO_INCREMENT, `column_no` int NOT NULL, `row_no` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `book` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `author` varchar(255) NOT NULL, `cover` varchar(255) NOT NULL, `isbn` varchar(255) NOT NULL, `price` varchar(255) NOT NULL, `publisher` varchar(255) NOT NULL, `image` varchar(255) NOT NULL, `bookPositionId` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `bookshelfId` int NULL, UNIQUE INDEX `REL_00036ab855480d8b724eea37bc` (`bookPositionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `book_shelf` ADD CONSTRAINT `FK_eec03309631bacd95969432c21c` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `book` ADD CONSTRAINT `FK_00036ab855480d8b724eea37bc1` FOREIGN KEY (`bookPositionId`) REFERENCES `book_position`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `book` ADD CONSTRAINT `FK_860a8b1058e0776fb87aaf75121` FOREIGN KEY (`bookshelfId`) REFERENCES `book_shelf`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `book` DROP FOREIGN KEY `FK_860a8b1058e0776fb87aaf75121`");
        await queryRunner.query("ALTER TABLE `book` DROP FOREIGN KEY `FK_00036ab855480d8b724eea37bc1`");
        await queryRunner.query("ALTER TABLE `book_shelf` DROP FOREIGN KEY `FK_eec03309631bacd95969432c21c`");
        await queryRunner.query("DROP INDEX `REL_00036ab855480d8b724eea37bc` ON `book`");
        await queryRunner.query("DROP TABLE `book`");
        await queryRunner.query("DROP TABLE `book_position`");
        await queryRunner.query("DROP TABLE `book_shelf`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
