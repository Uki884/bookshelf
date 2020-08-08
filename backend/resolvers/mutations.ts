export const Mutation = {
  // 本追加
  addBook: async (_, { input }, { Book, BookPosition }) => {
    const book = await Book.create({ ...input });
    const bookPosition = await new BookPosition();
    bookPosition.row_no = input.row_no;
    bookPosition.column_no = input.column_no;
    book.bookPosition = bookPosition;
    const result = await book.save();
    return result;
  },
  // 本棚作成
  createBookshelf: async (_, { input }, { BookShelf }) => {
    const bookshelf = await BookShelf.create({ ...input });
    console.log(bookshelf);
    await bookshelf.save();
    return bookshelf;
  },
  createUser: async (_, { input }, { User }) => {
    const user = await User.findOne({ auth0Id: input.auth0Id });
    if (!user) {
      const createduser = User.create({ ...input });
      createduser.save();
    }
    console.log(user);
    return user;
    // const user = await
  },
};
