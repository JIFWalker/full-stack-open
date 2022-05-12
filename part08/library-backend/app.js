const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = config.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const JWT_SECRET = 'secret'

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type User {
      username: String!
      favoriteGenre: String!
      books: [Book!]
      id: ID!
  }

  type Token {
      value: String!
  }

  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]
      id: ID!
  }

  type Author {
      name: String!
      born: Int
      bookCount: Int!
      id: ID!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(
        author: String,
        genre: String
      ): [Book!]
      allAuthors: [Author!]!
      me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    addBookToUser(
      title: String!
    ): User
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
          if (!args.author && !args.genre) {
              return Book.find({})
          } else if (args.author) {
              return Book.find({ author: args.author })
          } else if (args.genre) {
              return Book.find({ genres: args.genre })
          }
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => {
          return context.currentUser
      }
  },
  
  Author: {
    bookCount: async (root) =>
        Book.find({ author: root.id }).countDocuments()
  },

  Book: {
    author: async (root) => Author.findOne({ _id: root.author})
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('not logged in')
      }

        try {
            let author = await Author.findOne({ name: args.author })

            if (args.title.length < 3) {
                throw new UserInputError('Title too short')
              }

            if (!author) {
                if (args.author.length < 4) {
                    throw new UserInputError('Author name is too short')
                }
                author = new Author({ name: args.author })
                await author.save()
            }

            const bookObject = {
                title: args.title,
                author: author._id,
                published: Number(args.published),
                genres: [...args.genres]
            }

            const newBook = new Book(bookObject)

            currentUser.books = currentUser.books.concat(newBook)
            await currentUser.save()
            await newBook.save()
            return newBook
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }

    },
    addBookToUser: async (root, args, { currentUser }) => {
      const notAddedBook = (book) =>
        !currentUser.books.map(b => b._id.toString()).includes(book._id.toString())

        if (!currentUser) {
          throw new AuthenticationError('not logged in')
        }

        const book = await Book.findOne({ title: args.title })
        if ( notAddedBook(book) ) {
          currentUser.books = currentUser.books.concat(book)
        }

        await currentUser.save()

        return currentUser
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not logged in')
      }

      let author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

        return user.save()
        .catch(error => {
            throw new UserInputError(error.message, {
                inavlidArgs: args,
            })
        })
    },
    login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if ( !user || args.password !== 'secret' ) {
            throw new UserInputError('wrong credentials')
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        }

        return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
      const auth = req ? req.headers.authorization: null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const decodedToken = jwt.verify(
              auth.substring(7), JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id).populate('books')
          return { currentUser}
      }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})