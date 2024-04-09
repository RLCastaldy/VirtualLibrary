const { createUser, getSingleUser, saveBook, deleteBook, login } = require('../controllers/user-controller');
const { authMiddleware } = require('../utils/auth');

const resolvers = {
  Query: {
    me: getSingleUser,
  },
  Mutation: {
    addUser: createUser,
    login: login,
    saveBook: async (parent, args, context) => {
      if (context.user) {
        // User is authenticated, proceed with saving the book
        return saveBook(parent, args, context);
      } else {
        // User is not authenticated, throw an error or handle accordingly
        throw new Error('Authentication required to save a book');
      }
    },
    removeBook: deleteBook,
  },
};

module.exports = resolvers;