export const ERRORS = {
  userValidation: {
    username: 'Username must be a string',
    usernameMin: 'Username must be at least 3 characters long',
    usernameMax: 'Username must be at most 20 characters long',
    email: 'Email must be a valid email',
    password: 'Password is required',
    passwordMin: 'Password must be at least 6 characters long',
    passwordMax: 'Password must be at most 20 characters long',
    neitherUsernameNorEmail: 'You must provide either a username or an email'
  },
  userManaging: {
    userNotFound: 'User not found',
    userAlreadyExists: 'User already exists',
    usernameExists: 'A user with that username already exists',
    usernameNoExists: 'A user with that username does not exist',
    passwordExists: 'A user with that password already exists',
    passwordNoExists: 'A user with that password does not exist',
    emailExists: 'A user with that email already exists',
    emailNoExists: 'A user with that email does not exist'
  },
  unknown: 'An unespected error has occurred',
  permissionDenied: 'Your are not allowed for using this endpoint',
  jwt: {
    noToken: 'No token provided',
    invalidToken: 'Invalid token'
  },
  book: {
    noIdMatch: 'No book with that id was found',
    bookNotFound: 'Book not found',
    bookAlreadyExists: 'Book already exists',
    titleExists: 'A book with that title already exists',
    titleNoExists: 'A book with that title does not exist',
    authorExists: 'A book with that author already exists',
    authorNoExists: 'A book with that author does not exist',
    descriptionExists: 'A book with that description already exists',
    descriptionNoExists: 'A book with that description does not exist',
    priceExists: 'A book with that price already exists',
    priceNoExists: 'A book with that price does not exist'
  },
  bookValidation: {
    noTitle: 'No title provided',
    titleMin: 'Title must be at least 3 characters long',
    titleMax: 'Title must be at most 100 characters long',
    fileid: 'File id is required',
    bookIdNotUUID: 'Book id is not a valid UUID'
  },
  file: {
    noNameProvided: 'No name provided',
    noMIMETypeProvided: 'No mimeType provided',
    noFileProvided: 'No file provided',
    fileNotFound: 'File not found',
    fileAlreadyExists: 'File already exists'
  },
  drive: {
    folderNotFound: 'Folder not found',
    folderNotCreated: 'Folder not created',
    fileNotCreated: 'File not created'
  }
}
