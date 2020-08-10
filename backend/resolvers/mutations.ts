export const Mutation = {
  // 本追加
  addBook: async (_, { input }, { Book, BookPosition, BookShelf }) => {
    try {
      const book = await Book.create({ ...input });
      const bookShelf = await BookShelf.findOne({ id: input.bookshelfId });
      const bookPosition = await new BookPosition();
      bookPosition.row_no = input.row_no;
      bookPosition.column_no = input.column_no;
      book.bookPosition = bookPosition;
      book.bookshelf = bookShelf;
      const result = await book.save();
      return result;
    } catch {
      return null;
    }
  },
  // 本棚作成
  createBookshelf: async (_, { input }, { BookShelf, currentUser }) => {
    const bookshelf = await BookShelf.create({ ...input });
    bookshelf.user = currentUser;
    const data = await bookshelf.save();
    return data;
  },
  // 本の位置保存
  saveBookPosition: async (_, { input }, { BookShelf, currentUser, BookPosition }) => {
    const result = input.map(async (item, index) => {
      const position = await BookPosition.update({ id: item.id }, { ...item });
      return position;
    });
    // await
    return result;
  },
  // ユーザー作成
  createUser: async (_, { input }, { User }) => {
    const user = await User.findOne({ auth0Id: input.auth0Id });
    if (!user) {
      const createduser = User.create({ ...input });
      createduser.save();
    }
    return user;
  },
};
