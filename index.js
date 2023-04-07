const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
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

app.use('/', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});