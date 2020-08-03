export const Query = {
  books: (_, __, { Books }) => Books.find(),
};
