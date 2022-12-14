const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const occupants = require('./occupants');
const secretary = require('./secretary')
const eleva = require('./elevator')
const events = require('./events')
const maintanence = require('./maintanence');
const elevaDevice = require('./ElevaDevice');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 3000;

app.get('/occupants/:phone_number', occupants.CheckuserOccupants)
app.post('/occupants/register', occupants.creatUserOccupants)
app.get('/occupants/user/:id',occupants.getUserOccupants)
app.get('/occupants/getalloccupants/:id',occupants.getBuildingOccupants)
app.put('/occupants/user/:id',occupants.updateUserOccupants)

app.get('/secretary/:phone_number', secretary.checkUserSecretary)
app.post('/secretary/register', secretary.creatUserSecretary)
app.get('/secretary/user/:id',secretary.getUserSecretary)
app.put('/secretary/user/:id',secretary.updateUserSecretary)


app.get('/eleva/:id',eleva.getElevaDetails)
app.get('/building/:id',eleva.getBuildingDetails)

app.post('/create_event',events.creatEventsOccupants)
app.get('/events/:id',events.getEvents)
app.get('/events/getallevents/:date',events.getAllEvents)
app.delete('/delete_event/:id',events.deleteEvent)

app.post('/shedule_maintanence',maintanence.createMaintanence)
app.get('/eleva_maintanence/:id',maintanence.getMaintanence)

app.get('/eleva_device/occupants/:id',elevaDevice.getOccupants)
app.get('/eleva_device/events/:id',elevaDevice.getElevaEvents)
app.get('/eleva_device/elevator/:id',elevaDevice.getEleva)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});