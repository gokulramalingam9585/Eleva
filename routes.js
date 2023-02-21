const express = require('express');
const router = express.Router();
const occupants = require('./occupants');
const secretary = require('./secretary')
const eleva = require('./elevator')
const events = require('./events')
const maintanence = require('./maintanence');
const elevaDevice = require('./ElevaDevice');


router.get('/occupants/:phone_number', occupants.CheckuserOccupants)
router.post('/occupants/register', occupants.creatUserOccupants)
router.get('/occupants/user/:user_id',occupants.getUserOccupants)
router.get('/occupants/getalloccupants/:building_id',occupants.getBuildingOccupants)
router.put('/occupants/user/name:user_id',occupants.updateUserOccupantsName)
router.put('/occupants/user/email/:user_id',occupants.updateUserOccupantsEmail)
router.put('/occupants/user/profile/:user_id',occupants.updateUserOccupantsProfile)
router.put('/occupants/user/floor/:user_id',occupants.updateUserOccupantsFloorNo)

router.get('/secretary/:phone_number', secretary.checkUserSecretary)
router.post('/secretary/register', secretary.creatUserSecretary)
router.get('/secretary/user/:secretary_id',secretary.getUserSecretary)
router.put('/secretary/user/name/:secretary_id',secretary.updateUserSecretaryName)
router.put('/secretary/user/email/:secretary_id',secretary.updateUserSecretaryEmail)
router.put('/secretary/user/profile/:secretary_id',secretary.updateUserSecretaryProfile)


router.get('/eleva/:id',eleva.getElevaDetails)
router.get('/building/:building_id',eleva.getBuildingDetails)

router.post('/create_event',events.creatEventsOccupants)
router.get('/events/:id',events.getEvents)
router.get('/events/getallevents/:building_id/:date/:status',events.getAllEvents)
router.get('/events/alleventsacceptreject/:building_id/:date/:creator_id',events.getAllEventsAcceptedRejected)
router.delete('/delete_event/:id',events.deleteEvent)
router.put('/events/update/:id',events.updateEventStatus)
router.put('/events/updatedetails/:id',events.updateEventDetails)

router.post('/schedule_maintenance',maintanence.createMaintanence)
router.get('/eleva_maintenance/:building_id',maintanence.getMaintanence)

router.get('/eleva_device/occupants/:building_id',elevaDevice.getOccupants)
router.get('/eleva_device/events/:id',elevaDevice.getElevaEvents)
router.get('/eleva_device/elevator/:eleva_id',elevaDevice.getEleva)

module.exports = router;