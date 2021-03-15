const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    fileCover: {
        data: Buffer,
        contentType: String
    },
    fileName: {
        type: String,
    },
    fileBook: {
        type: Object,
    },
});

module.exports = model('Book', bookSchema);

// const {Schema, model} = require('mongoose');

// const bookSchema = new Schema({
//   title: {
//     type: String
//   },
//   description: {
//     type: String
//   },
//   authors: {
//     type: String
//   },
//   favorite: {
//     type: Boolean
//   },
//   fileCover: {
//     type: String
//   },
//   fileName: {
//     type: String
//   },
//   fileBook: {
//     type: String
//   }
// });

// module.exports = model('Book', bookSchema);