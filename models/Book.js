const uidGenerator = require('node-unique-id-generator')

class Book {
  constructor(title = 'none', description = 'none', authors = 'none', favorite = 'none', fileCover = 'none', fileName = 'none',  fileBook = 'none', id = uidGenerator.generateUniqueId()) {
      this.id = id,
      this.title = title,
      this.description = description,
      this.authors = authors,
      this.favorite = favorite,
      this.fileCover = fileCover,
      this.fileName = fileName
      this.fileBook = fileBook
  }
};

module.exports = Book;