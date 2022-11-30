const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const occupants = require('./occupants');
const secretary = require('./secretary')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 3000;

app.get('/occupants/:phone_number', occupants.CheckuserOccupants)
app.post('/occupants/register', occupants.creatUserOccupants)
app.get('/occupants/user/:id',occupants.getUserOccupants)
app.put('/occupants/user/:id',occupants.updateUserOccupants)

app.get('/secretary/user', secretary.checkUserSecretary)
app.post('/secretary/register', secretary.creatUserSecretary)
app.get('/secretary/user/:id',secretary.getUserSecretary)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});