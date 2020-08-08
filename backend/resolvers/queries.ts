export const Query = {
  books: (_, __, { Book }) => Book.find(),
  user: (_, { auth0Id }, { User }) => {
    const user = User.findOne({ auth0Id });
    return user;
  },
};
