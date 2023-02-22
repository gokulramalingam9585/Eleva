const express = require('express');
const bodyparser = require('body-parser');
const app = express();
//import api path 
const routes = require('./routes');
// table creation
const createTables = require('./create-tables');
createTables();

app.use('/', routes);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});