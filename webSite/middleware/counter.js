const fetch = require('node-fetch');

const getCount = async(id) => {
  const res = await fetch(`http://counter:3000/counter/${id}`)
  console.log(res);
  const count = await res.json();
  console.log(count);

  return count;
}

const upCounter = async(id) => {
  await fetch(`http://counter:3000/counter/${id}/incr`, {
    method: 'POST'
  })
}


module.exports = {
  upCounter,
  getCount
}