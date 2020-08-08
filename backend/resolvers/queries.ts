export const Query = {
  books: (_, __, { Book }) => Book.find(),
  user: async (_, { auth0Id }, { User }) => {
    const user = await User.findOne({ auth0Id }, { relations: ['bookShelf', 'bookShelf.books', 'bookShelf.books.bookPosition'] });
    return user;
  },
};
