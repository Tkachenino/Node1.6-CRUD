const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {

  const loginInfo = { id: 1, mail: "test@mail.ru" };
  res.status(201).send(loginInfo)
})

module.exports = router;