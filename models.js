const {Schema, default: mongoose} = require('mongoose')

const BookSchema = new Schema({
  title: {type: 'string', required: true},
  comments: [String]
})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book