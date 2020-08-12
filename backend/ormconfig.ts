module.exports = [{
  name: 'default',
  type: 'mysql',
  host: process.env.DATABASE_URL,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
    './models/**/*.ts',
  ],
  migrations: [
    './migrations/**/*.ts',
  ],
  subscribers: [
    './subscribers/**/*.ts',
  ],
  cli: {
    entitiesDir: './models',
    migrationsDir: './migrations',
    subscribersDir: './subscribers',
  },
}];
