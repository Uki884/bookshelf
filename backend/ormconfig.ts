const path = require('path');

module.exports = [{
  name: 'default',
  type: 'mysql',
  host: process.env.DATABASE_URL,
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/dist/models/**/*.js`],
  migrations: [
    `${__dirname}/dist/migrations/**/*.js`,
  ],
  subscribers: [
    `${__dirname}/dist/subscribers/**/*.js`,
  ],
  cli: {
    entitiesDir: './models',
    migrationsDir: './migrations',
    subscribersDir: './subscribers',
  },
}];
