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
app.put('/occupants/user/:id',occupants.updateUserOccupants)
app.get('/occupants/getalloccupants/:building_id',occupants.getBuildingOccupants)
app.put('/occupants/user/name/:user_id',occupants.updateUserOccupantsName)
app.put('/occupants/user/email/:user_id',occupants.updateUserOccupantsEmail)
app.put('/occupants/user/profile/:user_id',occupants.updateUserOccupantsProfile)
app.put('/occupants/user/floor/:user_id',occupants.updateUserOccupantsFloorNo)

app.get('/secretary/:phone_number', secretary.checkUserSecretary)
app.post('/secretary/register', secretary.creatUserSecretary)
app.get('/secretary/user/:id',secretary.getUserSecretary)
//app.put('/secretary/user/:id',secretary.updateUserSecretary)

app.put('/secretary/user/name/:id',secretary.updateUserSecretaryName)
app.put('/secretary/user/email/:id',secretary.updateUserSecretaryEmail)
app.put('/secretary/user/profile/:id',secretary.updateUserSecretaryProfile)

app.get('/eleva/:id',eleva.getElevaDetails)
app.get('/building/:id',eleva.getBuildingDetails)

app.post('/create_event',events.creatEventsOccupants)
app.get('/events/:id',events.getEvents)
app.get('/events/getallevents/:building_id/:date/:status',events.getAllEvents)
app.get('/events/alleventsacceptreject/:building_id/:date/:creator_id',events.getAllEventsAcceptedRejected)
app.delete('/delete_event/:id',events.deleteEvent)
app.put('/events/updatestatus',events.updateEventStatus)
app.put('/events/updatedetails',events.updateEventDetails)

app.post('/schedule_maintenance',maintanence.createMaintanence)
app.get('/eleva_maintenance/:building_id/:date',maintanence.getMaintanence)

app.get('/eleva_device/occupants/:id',elevaDevice.getOccupants)
app.get('/eleva_device/events/:id',elevaDevice.getElevaEvents)
app.get('/eleva_device/elevator/:id',elevaDevice.getEleva)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});