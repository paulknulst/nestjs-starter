/* eslint-disable */
const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class nestdb1639168799148 {
    name = 'nestdb1639168799148'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`note\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(150) NOT NULL,
                \`description\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`subscription\` (
                \`uid\` int NOT NULL AUTO_INCREMENT,
                \`modules\` text NULL,
                \`sub_type\` varchar(255) NULL,
                \`userUid\` int NULL,
                PRIMARY KEY (\`uid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`uid\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(150) NOT NULL,
                \`gender\` varchar(1) NOT NULL,
                PRIMARY KEY (\`uid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`subscription\`
            ADD CONSTRAINT \`FK_9d34efa504d4ea976337de5e7f9\` FOREIGN KEY (\`userUid\`) REFERENCES \`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_9d34efa504d4ea976337de5e7f9\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`subscription\`
        `);
        await queryRunner.query(`
            DROP TABLE \`note\`
        `);
    }
}
