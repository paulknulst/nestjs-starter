const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class nestdb1639168929976 {
    name = 'nestdb1639168929976'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE \`note\`
            ADD \`userUid\` int NULL
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
            ALTER TABLE \`note\` DROP COLUMN \`userUid\`
        `);
    }
}
