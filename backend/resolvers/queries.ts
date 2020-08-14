import { Not, Equal, IsNull } from 'typeorm';

export const Query = {
  books: (_, __, { Book }) => Book.find(),
  currentUser: (_, __, { currentUser }) => currentUser,
  user: async (_, { auth0Id }, { User }) => {
    const user = await User.findOne({ auth0Id }, { relations: ['bookShelf', 'bookShelf.books', 'bookShelf.books.bookPosition'] });
    return user;
  },
  // ログインユーザーの本棚のみ取得
  userBookshelfs: async (_, { userId }, { currentUser, User, BookShelf }) => {
    const bookshelfs = await BookShelf.find({
      where: { user: userId },
      relations: ['books', 'books.bookPosition', 'user'],
    });
    return bookshelfs;
  },
};
