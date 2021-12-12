const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class nestdb1639266099541 {
    name = 'nestdb1639266099541'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`module\` (
                \`uid\` varchar(36) NOT NULL,
                \`name\` varchar(255) NULL,
                PRIMARY KEY (\`uid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`subscription\` (
                \`uid\` varchar(36) NOT NULL,
                \`modules\` text NULL,
                \`sub_type\` varchar(255) NULL,
                \`userUid\` varchar(36) NULL,
                PRIMARY KEY (\`uid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`uid\` varchar(36) NOT NULL,
                \`name\` varchar(150) NOT NULL,
                \`gender\` varchar(1) NOT NULL,
                PRIMARY KEY (\`uid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`note\` (
                \`uid\` varchar(36) NOT NULL,
                \`title\` varchar(150) NOT NULL,
                \`description\` varchar(255) NOT NULL,
                \`userUid\` varchar(36) NULL,
                PRIMARY KEY (\`uid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`subscription\`
            ADD CONSTRAINT \`FK_9d34efa504d4ea976337de5e7f9\` FOREIGN KEY (\`userUid\`) REFERENCES \`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`note\`
            ADD CONSTRAINT \`FK_4ae01158b22ae5b4a51183983ea\` FOREIGN KEY (\`userUid\`) REFERENCES \`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_4ae01158b22ae5b4a51183983ea\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_9d34efa504d4ea976337de5e7f9\`
        `);
        await queryRunner.query(`
            DROP TABLE \`note\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`subscription\`
        `);
        await queryRunner.query(`
            DROP TABLE \`module\`
        `);
    }
}
