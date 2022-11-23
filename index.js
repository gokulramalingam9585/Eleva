const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const db = require('./query');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 3000;

app.post('/user', db.Checkuser)
app.post('/register', db.creatUser)
app.get('/user/:phone_number',db.getUsers)




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});