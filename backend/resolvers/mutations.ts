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
  changeBookshelfName: async (_, { input }, { BookShelf, currentUser }) => {
    const bookshelf = await BookShelf.findOne({ id: input.id }, { relations: ['user'] });
    if (bookshelf.user.id !== currentUser.id) return new Error('本棚の情報を更新できませんでした');
    bookshelf.name = input.name;
    await bookshelf.save();
    return bookshelf;
  },
  deleteBookshelf: async (_, { bookshelfId }, { BookShelf, currentUser }) => {
    if (!bookshelfId) return new Error('本棚を削除できませんでした');
    const targetBookShelf = await BookShelf.findOne(bookshelfId, { relations: ['user'] });
    try {
      if (targetBookShelf.user.id === currentUser.id) {
        const result = await targetBookShelf.remove();
        return result;
      }
    } catch (err) {
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
  createUser: async (_, { input }, { User, BookShelf }) => {
    const user = await User.findOne(
      { auth0Id: input.auth0Id },
      {
        relations: [
          'bookShelf',
          'bookShelf.books',
          'bookShelf.books.bookPosition',
        ],
      },
    );
    if (!user) {
      const createduser = await User.create({ ...input });
      await createduser.save();
      const bookshelfInput = {
        name: 'サンプル本棚',
        description: '',
      };
      const bookshelf = await BookShelf.create({ ...bookshelfInput });
      bookshelf.user = createduser;
      await bookshelf.save();
      const newUser = await User.findOne({ id: createduser.id }, { relations: ['bookShelf', 'bookShelf.books', 'bookShelf.books.bookPosition'] });
      return newUser;
    }
    return user;
  },
};
