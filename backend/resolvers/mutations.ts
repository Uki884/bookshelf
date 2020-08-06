export const Mutation = {
  setBooks: (_, __, context) => {
    console.log(context);
  },
  createBookshelf: async (_, __, { BookShelfs }) => {
    const bookshelfs = await BookShelfs.create({ name: 'テスト', description: 'aaa' });
    console.log(bookshelfs);
    await bookshelfs.save();
    return bookshelfs;
  },
};
