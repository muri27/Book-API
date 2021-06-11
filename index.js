const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const booksRouter = require('./routes/books.js');
const conn = require('./config.js');
 
// parse application/json
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

conn.connect((err) =>{
  if(err) throw err;
  console.log('Database Connected');
});

app.use('/books', booksRouter);

//Server listening
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`)
});