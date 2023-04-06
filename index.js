const express = require('express');
const bodyparser = require('body-parser');
const app = express();
//import api path 
const routes = require('./routes');
// table creation
const createTables = require('./create-tables');
createTables();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))

app.use('/', routes);

app.use('/test', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});