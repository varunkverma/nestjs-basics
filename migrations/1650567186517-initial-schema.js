const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class initialSchema1625847615203 {
  name = 'initialSchema1625847615203';

  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'admin',
            type: 'boolean',
            default: 'true',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'report',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'approved', type: 'boolean', default: 'false' },
          { name: 'price', type: 'float' },
          { name: 'make', type: 'varchar' },
          { name: 'model', type: 'varchar' },
          { name: 'year', type: 'integer' },
          { name: 'lng', type: 'float' },
          { name: 'lat', type: 'float' },
          { name: 'mileage', type: 'integer' },
          { name: 'userId', type: 'integer' },
        ],
      }),
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE ""report""`);
    await queryRunner.query(`DROP TABLE ""user""`);
  }
};

// const { MigrationInterface, QueryRunner } = require("typeorm");

// module.exports = class initialSchema1650567186517 {
//     name = 'initialSchema1650567186517'

//     async up(queryRunner) {
//         await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lat" integer NOT NULL, "lng" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer)`);
//         await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "admin" boolean NOT NULL DEFAULT (1), "email" varchar NOT NULL, "password" varchar NOT NULL)`);
//         await queryRunner.query(`CREATE TABLE "temporary_report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lat" integer NOT NULL, "lng" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
//         await queryRunner.query(`INSERT INTO "temporary_report"("id", "price", "make", "model", "year", "lat", "lng", "mileage", "approved", "userId") SELECT "id", "price", "make", "model", "year", "lat", "lng", "mileage", "approved", "userId" FROM "report"`);
//         await queryRunner.query(`DROP TABLE "report"`);
//         await queryRunner.query(`ALTER TABLE "temporary_report" RENAME TO "report"`);
//     }

//     async down(queryRunner) {
//         await queryRunner.query(`ALTER TABLE "report" RENAME TO "temporary_report"`);
//         await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lat" integer NOT NULL, "lng" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer)`);
//         await queryRunner.query(`INSERT INTO "report"("id", "price", "make", "model", "year", "lat", "lng", "mileage", "approved", "userId") SELECT "id", "price", "make", "model", "year", "lat", "lng", "mileage", "approved", "userId" FROM "temporary_report"`);
//         await queryRunner.query(`DROP TABLE "temporary_report"`);
//         await queryRunner.query(`DROP TABLE "user"`);
//         await queryRunner.query(`DROP TABLE "report"`);
//     }
// }
