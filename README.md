Запрос(ы) для вставки данных минимум о двух книгах в коллекцию books:

db.books.insertMany([{
title: "title1",
description: "description1",
authors: "authors"
},
{
title: "title2",
description: "description2",
authors: "authors"
}
])

запрос для поиска полей документов коллекции books по полю title:

db.books.find({title: {$exists:true}})

запрос для редактирования полей: description и authors коллекции books по \_id записи

db.books.updateOne({\_id: '1232'},{$set: {description: 'description3', authors: 'authors3'}})

\*Каждый документ коллекции books должен содержать следующую структуру данных:

{
title: "string",
description: "string",
authors: "string"
}
