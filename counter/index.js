const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
let counter = require('/counter/db.json');


const app = express();

app.use(cors());

app.get('/counter/:bookId', (req, res) => {
  const {bookId} = req.params;

  let idx = counter.findIndex(i => i.id === bookId);
  
  if (idx >= 0) {
    res.status(200).json(counter[idx].count)
  } else {
    res.status(404).json('счетчик не обноружен')
  }
})

app.post('/counter/:bookId/incr', (req, res) => {
  const {bookId} = req.params;

  let idx = counter.findIndex(i => i.id === bookId);
  const pathWay = path.join('./db.json');

  if (idx >= 0) {
    counter[idx].count += 1;
    fs.writeFile(pathWay, JSON.stringify(counter), (error) => {
      if (error) throw new Error(error);
    })
  } else {
   counter = [...counter, {id: bookId, count: 1}];
    fs.writeFile(pathWay, JSON.stringify(newCounter), (error) => {
      if (error) throw new Error(error);
    })
  }
  
  

    res.status(200).json(counter[idx].count)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});