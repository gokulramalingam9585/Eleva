
const bcrypt = require('bcrypt');
const { request } = require('express');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'shalla',
    database: 'eleva'
});


const creatEventsOccupants = (request, response) => {
    const {title, details, date, from_time, to_time, location, status, building_id, created_by, creator_id } = request.body
    console.log({ location });

    pool.query('INSERT INTO events_details (title,details,date,from_time,to_time,location,status,building_id,created_by,creator_id ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        [title, details, date, from_time, to_time, location, status, building_id, created_by, creator_id], (error, result) => {
            if (error) {
                return response.status(400).json({
                    status: "Error",
                    reCode: 400,
                    msg: "Event Not Created",
                    isExist: false
                });
                console.log('error : '+{ error });

            }
            response.status(200).json({
                status: "Success",
                reCode: 200,
                msg: `Event Created successfully`
            });
        })
}

const getEvents = (request, response) => {
    const id = request.params.id
    pool.query('select * from events_details where id = $1', [id], (error, result) => {
        if (error) {
            return response.status(400).json({
                status: "Error",
                reCode: 400,
                msg: "Request Not Available",
                isExist: false
            })
        }
        if (!result.rows.length) {
            return response.status(200).json({
                status: "Sucess",
                reCode: 200,
                response: `${id}`,
                msg: "Events Not Exisit",
                isExist: false
            })
        }
        response.status(200).json(result.rows)
    })
}

const getAllEvents = (request, response) => {
    const date = request.params.date
    const building_id = request.params.building_id+''
    const status = request.params.status + ''


    pool.query("SELECT events_details.*, occupants_details.first_name as occ_first_name,occupants_details.last_name as occ_last_name,occupants_details.profile_url as occ_profile_url, secretary_details.first_name as sec_first_name,secretary_details.last_name as sec_last_name,secretary_details.profile_url as sec_profile_url FROM events_details LEFT JOIN occupants_details ON events_details.creator_id = occupants_details.user_id AND events_details.created_by = 'occupant' LEFT JOIN secretary_details ON events_details.creator_id = secretary_details.secretary_id AND events_details.created_by = 'secretary' where events_details.building_id = $1 and events_details.date>=$2 and events_details.status = $3 order by date asc", [building_id,date,status], (error, result) => {
        if (error) {
            response.status(400).json({
                status: "Error",
                reCode: 400,
                msg: "Request Not Available",
                isExist: false
            })
            console.log("error :"+error)
            return
        }
        if (!result.rows.length) {
            response.status(200).json({
                status: "Success",
                reCode: 200,
                response: `${building_id}`,
                msg: "Events Not Available",
                isExist: false
            })
            return
        }
        response.status(200).json({
                status: "Success",
                reCode: 200,
                msg: "Events Available",
                isExist: true,
                response: result.rows
            })
    })
}

const getAllEventsAcceptedRejected = (request, response) => {
    const date = request.params.date
    const building_id = request.params.building_id+''
    const creator_id = request.params.creator_id+''

   // const {date,building_id,creator_id} = request.body

    
    const stat_acc = 'accepted'
    const stat_rej = 'rejected'

    pool.query("SELECT * from events_details where building_id = $1 and date>=$2  and creator_id = $3 and (status = $4 or status = $5)", [building_id,date,creator_id,stat_acc,stat_rej], (error, result) => {
        if (error) {
            response.status(400).json({
                status: "Error",
                reCode: 400,
                msg: "Request Not Available",
                isExist: false
            })
            console.log("error :"+error)
            return
        }
        if (!result.rows.length) {
            response.status(200).json({
                status: "Success",
                reCode: 200,
                response: `${building_id}`,
                msg: "Events Not Availables",
                isExist: false
            })
            return
        }
        response.status(200).json({
                status: "Success",
                reCode: 200,
                msg: "Events Available",
                isExist: true,
                response: result.rows
            })
    })
}

const deleteEvent = (request, response) => {
    const id = request.params.id;

    pool.query('DELETE FROM events_details WHERE id = $1', [id], (error, result) => {
        if (error) {
            return response.status(400).json({
                status: "Error",
                reCode: 400,
                msg: "Not Deleted Sucessfully",
                isExist: false
            })
        }
        response.status(200).json({ status: "sucess", reCode: 200, Msg: `Event deleted with : ${id}` })
    })
}

const updateEventStatus = (request, response) => {
    
    const {id,denied_reason, secretary_notes,status,cancel_reason} = request.body

    if(status=='accepted'){
    pool.query('update events_details set secretary_notes = $1, status = $2 where id = $3', [secretary_notes,status,id], (error, result) => {
        if (error) {
             response.status(400).json({
                status: false,
                reCode: 400,
                msg: "Event Not Updated"
            })
            return
        }
        response.status(200).json({
            status: true,
            reCode: 200,
            msg: `Event Accepted`
        })
    })
}else if (status=='rejected') {
    pool.query('update events_details set status = $1,  denied_reason = $2 where id = $3', [status,denied_reason,id], (error, result) => {
        if (error) {
             response.status(400).json({
                status: false,
                reCode: 400,
                msg: "Event Not Updated"
            })
            return
        }
        response.status(200).json({
            status: true,
            reCode: 200,
            msg: `Event Denied`
        })
    })
}else if(status=='cancelled'){
    pool.query('update events_details set status = $1, cancel_reason = $2 where id = $3', [status,cancel_reason,id], (error, result) => {
        if (error) {
            return response.status(400).json({
                status: false,
                reCode: 400,
                msg: "Event Not Updated"
            })
        }
        response.status(200).json({
            status: true,
            reCode: 200,
            msg: `Event Cancelled`
        })
    })
}
}

const updateEventDetails = (request, response) => {
    
    const {title, details, date, from_time, to_time, location,id} = request.body
    console.log({ location });

    pool.query('update events_details set title = $1,  details = $2,date = $3,from_time = $4, to_time = $5, location = $6 where id = $7', [title, details, date, from_time, to_time, location,id], (error, result) => {
        if (error) {
            return response.status(400).json({
                status: false,
                reCode: 400,
                msg: "Event Not Updated"
            })
        }
        response.status(200).json({
            status: true,
            reCode: 200,
            msg: `Event updated successfully`
        })
    })
}



module.exports = {
    creatEventsOccupants,
    getEvents,
    deleteEvent,
    getAllEvents,
    updateEventStatus,
    updateEventDetails,
    getAllEventsAcceptedRejected
}
