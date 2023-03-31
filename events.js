
const bcrypt = require('bcrypt');
const { request } = require('express');
const pool = require("./database");

const creatEventsOccupants = (request, response) => {
    try {
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            if (error) {
                response.status(500).json({
                    status: "Error",
                    reCode: 500,
                    msg: "Failed to acquire a database connection",
                    isExist: false
                });
                return;
            }
            const { id, title, details, date, from_time, to_time, location, status, cancel_reason, denied_reason, building_id, created_by, creator_id, secretary_notes } = request.body
            console.log({ location });
            client.query('INSERT INTO eleva.events_details ( id,title,details,date,from_time,to_time,location,status,cancel_reason,denied_reason,building_id,created_by,creator_id,secretary_notes ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',
                [id, title, details, date, from_time, to_time, location, status, cancel_reason, denied_reason, building_id, created_by, creator_id, secretary_notes],
                (error, result) => {
                    client.release();
                    response.status(200).json({
                        status: "Sucess",
                        reCode: 200,
                        response: `${title}`,
                        msg: `Event Created successfully`
                    });
                })
        })
    } catch (error) {
        response.status(400).json({
            status: "Error",
            reCode: 400,
            msg: "Event Not Created Sucessfully",
            isExist: false
        })
        return
    }

}

const getEvents = (request, response) => {
    try {
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            if (error) {
                response.status(500).json({
                    status: "Error",
                    reCode: 500,
                    msg: "Failed to acquire a database connection",
                    isExist: false
                });
                return;
            }
            const id = request.params.id
            client.query('select * from eleva.events_details where id = $1', [id], (error, result) => {
                client.release();
                if (!result.rows.length) {
                    response.status(200).json({
                        status: "Sucess",
                        reCode: 200,
                        response: `${id}`,
                        msg: "Event Not Exisit",
                        isExist: false
                    })
                    return
                }
                response.status(200).json({
                    status: "Sucess",
                    reCode: 200,
                    msg: "Events Available",
                    isExist: true,
                    response: result.rows
                })
            })
        })
    } catch (error) {
        response.status(400).json({
            status: "Error",
            reCode: 400,
            msg: "Request Not Available",
            isExist: false
        })
        return
    }
}



const getAllEvents = (request, response) => {
    try {
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            if (error) {
                response.status(500).json({
                    status: "Error",
                    reCode: 500,
                    msg: "Failed to acquire a database connection",
                    isExist: false
                });
                return;
            }
            const date = request.params.date
            const building_id = request.params.building_id + ''
            const status = request.params.status + ''
            client.query("SELECT events_details.*, occupants_details.first_name as occ_first_name,occupants_details.last_name as occ_last_name,occupants_details.profile_url as occ_profile_url, secretary_details.first_name as sec_first_name,secretary_details.last_name as sec_last_name,secretary_details.profile_url as sec_profile_url FROM events_details LEFT JOIN occupants_details ON events_details.creator_id = occupants_details.user_id AND events_details.created_by = 'occupant' LEFT JOIN secretary_details ON events_details.creator_id = secretary_details.secretary_id AND events_details.created_by = 'secretary' where events_details.building_id = $1 and events_details.date>=$2 and events_details.status = $3", [building_id, date, status], (error, result) => {
                client.release();
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
        })
    } catch (error) {
        response.status(400).json({
            status: "Error",
            reCode: 400,
            msg: "Request Not Available",
            isExist: false
        })
        console.log("error :" + error)
        return
    }

}

const getAllEventsAcceptedRejected = (request, response) => {
    try {
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            if (error) {
                response.status(500).json({
                    status: "Error",
                    reCode: 500,
                    msg: "Failed to acquire a database connection",
                    isExist: false
                });
                return;
            }
            const date = request.params.date
            const building_id = request.params.building_id + ''
            const creator_id = request.params.creator_id + ''
            const stat_acc = 'accepted'
            const stat_rej = 'rejected'

            client.query("SELECT * from eleva.events_details where building_id = $1 and date>=$2 and creator_id = $3 and (status = $4 or status = $5)", [building_id, date, creator_id, stat_acc, stat_rej], (error, result) => {
                client.release();
                if (!result.rows.length) {
                    response.status(200).json({
                        status: "Success",
                        reCode: 200,
                        response: `${building_id}`,
                        msg: "Events Not Availables",
                        isExist: false
                    })
                    console.log(result.rows.length);
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
        })
    } catch (error) {
        response.status(400).json({
            status: "Error",
            reCode: 400,
            msg: "Request Not Available",
            isExist: false
        })
        console.log("error :" + error)
        return
    }
}

const deleteEvent = (request, response) => {
    try {
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            if (error) {
                response.status(500).json({
                    status: "Error",
                    reCode: 500,
                    msg: "Failed to acquire a database connection",
                    isExist: false
                });
                return;
            }
            const id = request.params.id;
            client.query('DELETE FROM eleva.events_details WHERE id = $1', [id], (error, result) => {
                client.release();
                response.status(200).json({
                    status: "sucess",
                    reCode: 200,
                    response: `${id}`,
                    Msg: 'Event Deleted Sucessfully'
                })
            })
        })
    } catch (error) {
        response.status(400).json({
            status: "Error",
            reCode: 400,
            msg: "Not Deleted Sucessfully",
            isExist: false
        })
        return
    }
}

const updateEventStatus = (request, response) => {
    try {
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            if (error) {
                response.status(500).json({
                    status: "Error",
                    reCode: 500,
                    msg: "Failed to acquire a database connection",
                    isExist: false
                });
                return;
            }
            const { id, denied_reason, secretary_notes, status, cancel_reason } = request.body
            if (status == 'accepted') {
                client.query('update eleva.events_details set secretary_notes = $1, status = $2 where id = $3', [secretary_notes, status, id], (error, result) => {
                    client.release();
                    response.status(200).json({
                        status: true,
                        reCode: 200,
                        msg: `Event Accepted`
                    })
                })
            } else if (status == 'rejected') {
                pool.query('update eleva.events_details set status = $1,  denied_reason = $2 where id = $3', [status, denied_reason, id], (error, result) => {
                    response.status(200).json({
                        status: true,
                        reCode: 200,
                        msg: `Event Denied`
                    })
                })
            } else if (status == 'cancelled') {
                pool.query('update eleva.events_details set status = $1, cancel_reason = $2 where id = $3', [status, cancel_reason, id], (error, result) => {
                    response.status(200).json({
                        status: true,
                        reCode: 200,
                        msg: `Event Cancelled`
                    })
                })
            }
        })
    } catch (error) {
        return response.status(400).json({
            status: false,
            reCode: 400,
            msg: "Event Not Updated"
        })
    }
}

const updateEventDetails = (request, response) => {
    try {
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            if (error) {
                response.status(500).json({
                    status: "Error",
                    reCode: 500,
                    msg: "Failed to acquire a database connection",
                    isExist: false
                });
                return;
            }
            const { title, details, date, from_time, to_time, location, id } = request.body
            console.log({ location });

            client.query('update eleva.events_details set title = $1,  details = $2,date = $3,from_time = $4, to_time = $5, location = $6 where id = $7', [title, details, date, from_time, to_time, location, id], (error, result) => {
                client.release();
                response.status(200).json({
                    status: true,
                    reCode: 200,
                    msg: `Event updated successfully`
                })
            })
        })
    } catch (error) {
        response.status(400).json({
            status: false,
            reCode: 400,
            msg: "Event Not Updated"
        })
        return
    }
}

module.exports = {
    creatEventsOccupants,
    getEvents,
    deleteEvent,
    getAllEvents,
    getAllEventsAcceptedRejected,
    updateEventStatus,
    updateEventDetails
}
