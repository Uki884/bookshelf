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
  deleteBook: async (_, { bookId }, { Book, currentUser }) => {
    if (!bookId) return new Error('本を削除できませんでした');
    const targetBook = await Book.findOne(bookId, { relations: ['bookshelf', 'bookshelf.user'] });
    try {
      if (targetBook.bookshelf.user.id === currentUser.id) {
        const result = await targetBook.remove();
        return result;
      }
      return new Error('本を削除できませんでした');
    } catch {
      return new Error('本を削除できませんでした');
    }
  },
  // 本棚作成
  createBookshelf: async (_, { input }, { BookShelf, currentUser }) => {
    const bookshelf = await BookShelf.create({ ...input });
    bookshelf.user = currentUser;
    const data = await bookshelf.save();
    return data;
  },
  deleteBookshelf: async (_, { bookshelfId }, { BookShelf, currentUser }) => {
    if (!bookshelfId) return new Error('本棚を削除できませんでした');
    const targetBookShelf = await BookShelf.findOne(bookshelfId, { relations: ['user'] });
    try {
      if (targetBookShelf.user.id === currentUser.id) {
        const result = await targetBookShelf.remove();
        return result;
      }
      return new Error('本棚を削除できませんでした');
    } catch {
      return new Error('本棚を削除できませんでした');
    }
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
