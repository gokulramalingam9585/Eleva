
const bcrypt = require('bcrypt');
const { request } = require('express');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 9000,
    user: 'postgres',
    password: 'root',
    database: 'test'
});

const creatEventsOccupants = (request,response)=>{
    const { id,title,details,date,from_time,to_time,location,status,cancel_reason,denied_reason,building_id,created_by,creator_id } = request.body
    console.log({location});

    pool.query('INSERT INTO eleva.events_details ( id,title,details,date,from_time,to_time,location,status,cancel_reason,denied_reason,building_id,created_by,creator_id ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
    [id,title,details,date,from_time,to_time,location,status,cancel_reason,denied_reason,building_id,created_by,creator_id],(error,result)=>{
        if(error){
            response.status(400).json({status: "Error", reCode: 400, msg: "Event Not Created Sucessfully",isExist:false})
        }
        response.status(200).json({status:"Sucess", reCode:200, msg:`Event Created successfully with Id : ${id}`});
    })
}

const getEvents = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('select * from eleva.events_details where id = $1', [id], (error, result) => {
        if (error) {
            response.status(400).json({status: "Error", reCode: 400, msg: "Request Not Available",isExist:false})
        }
        if(!result.rows.length){
            response.status(200).json({status:"Sucess",reCode:200,msg:"Events Not Exisit",isExist:false})
        }
            response.status(200).json(result.rows)
    })
}

const deleteEvent = (request,response)=>{
    const id = parseInt(request.params.id);

    // console.log('Id id'+Teach_Id);
    pool.query('DELETE FROM eleva.events_details WHERE id = $1',[id],(error,result)=>{
        if(error){
            response.status(400).json({status: "Error", reCode: 400, msg: "Not Deleted Sucessfully",isExist:false})
        }
        response.status(200).json({status:"sucess", reCode:200, Msg:`Event deleted with : ${id}`})
    })
}



module.exports = {
    creatEventsOccupants,
    getEvents,
    deleteEvent
}
