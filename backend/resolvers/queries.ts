export const Query = {
  books: (_, __, { Book }) => Book.find(),
  currentUser: (_, __, { currentUser }) => currentUser,
  user: async (_, { auth0Id }, { User }) => {
    const user = await User.findOne({ auth0Id }, { relations: ['bookShelf', 'bookShelf.books', 'bookShelf.books.bookPosition'] });
    return user;
  },
};
