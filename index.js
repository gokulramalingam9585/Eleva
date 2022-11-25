const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const db = require('./query');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 3000;

app.get('/occupants/user', db.CheckuserOccupants)
app.post('/occupants/register', db.creatUserOccupants)
app.get('/occupants/user/:id',db.getUserOccupants)

app.get('/secretary/user', db.checkUserSecretary)
app.post('/secretary/register', db.creatUserSecretary)
app.get('/secretary/user/:id',db.getUserSecretary)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});