import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';
// executed before every single test across all of our different spec files
global.beforeEach(async () => {
  // before each test, delete the test db
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

global.afterEach(async () => {
  // after each test diconnect from the database, as it will be deleted before next test is ran.
  const conn = await getConnection();
  await conn.close();
});
