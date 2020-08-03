module.exports = [{
  name: 'default',
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'bookshelf',
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
