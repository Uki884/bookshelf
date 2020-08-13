import { createConnection } from 'typeorm';
// import { Books } from '@/models/Books.ts';
// eslint-disable-next-line import/prefer-default-export
export const dbconnect = async () => {
  await createConnection('default').then(async (connection) => {
  //   const Book = new Books();
  //   Book.title = 'aaaa';
  //   await connection.manager.save(Book);
  });
};
