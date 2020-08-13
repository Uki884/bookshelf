export const Query = {
  books: (_, __, { Book }) => Book.find(),
  currentUser: (_, __, { currentUser }) => currentUser,
  user: async (_, { auth0Id }, { User }) => {
    const user = await User.findOne({ auth0Id }, { relations: ['bookShelf', 'bookShelf.books', 'bookShelf.books.bookPosition'] });
    return user;
  },
  // ログインユーザーの本棚のみ取得
  userBookshelfs: async (_, __, { currentUser, User, BookShelf }) => {
    const bookshelfs = await BookShelf.find(
      {
        where: { user: currentUser },
        relations: ['books', 'books.bookPosition', 'user'],
      },
    );
    return bookshelfs;
  },
};
