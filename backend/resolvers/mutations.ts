export const Mutation = {
  addBook: async (_, { input }, { Book, BookPosition }) => {
    const book = Book.create({ ...input });
    const bookPosition = BookPosition.create({ row_no: 2, column_no: 2 });
    book.bookPosition = bookPosition;
    await bookPosition.save();
    await book.save();
    return book;
  },
  createBookshelf: async (_, { input }, { BookShelfs }) => {
    const bookshelfs = await BookShelfs.create({ name: 'テスト', description: 'aaa' });
    console.log(bookshelfs);
    await bookshelfs.save();
    return bookshelfs;
  },
};
