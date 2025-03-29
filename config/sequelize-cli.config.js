require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    migrationStoragePath: 'src/database/migrations',
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    migrationStoragePath: 'src/database/migrations',
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    migrationStoragePath: 'src/database/migrations',
  }
};
