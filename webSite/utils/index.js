const fs = require("fs");
const path = require("path")

function getFileData(file) {
   let data = fs.readFileSync(path.join(__dirname, `/../public/pdf/`, file.filename));
   let buff = new Buffer(data);
   let base64data = buff.toString('base64');

   return file
      ? {
           data: base64data,
           contentType: file.mimetype,
        }
      : {};
}

module.exports = { getFileData };