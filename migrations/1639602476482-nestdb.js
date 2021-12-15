const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class nestdb1639602476482 {
    name = 'nestdb1639602476482'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`password\` varchar(255) NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`password\`
        `);
    }
}
