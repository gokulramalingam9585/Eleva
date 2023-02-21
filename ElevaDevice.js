
const bcrypt = require('bcrypt');
const pool = require("./database");


const getOccupants = (request, response) => {
try{    
    const building_id = request.params.building_id
    pool.query('select * from eleva.occupants_details where building_id = $1', [building_id], (error, result) => {
        if (!result.rows.length) {
            response.status(200).json({
                status: "Sucess",
                reCode: 200,
                response: `${building_id}`,
                msg: "User Not Exist",
                isExist: false
            })
            return;
        }
        response.status(200).json(
            {
                status: "Sucess",
                reCode: 200,
                msg: "Occupants Available",
                isExist: true,
                response: result.rows 
            }
            )
    })
} catch (error) {
    response.status(400).json({
       status: "Error",
       reCode: 400,
       msg: "Request Not Available",
       isExist: false
   })
   return;
}
}

const getElevaEvents = (request, response) => {
try{
    const id = request.params.id
    pool.query('select * from eleva.events_details where id = $1', [id], (error, result) => {
        if (!result.rows.length) {
             response.status(200).json({
                status: "Sucess",
                reCode: 200,
                response: `${id}`,
                msg: "Events Not Exisit",
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

const getEleva = (request, response) => {
try{
    const eleva_id = request.params.eleva_id
    pool.query('select * from eleva.eleva_details where eleva_id = $1', [eleva_id], (error, result) => {
        if (!result.rows.length) {
             response.status(200).json({ 
                status: "sucess", 
                reCode: 200,
                response:`${eleva_id}`, 
                msg: "eleva Not Exist",
                isExist:false })
                return
        }
        else {
            response.status(200).json({ 
                status: "sucess", 
                reCode: 200, 
                msg: "Elevator Available",
                isExist:true,
                response: result.rows })
        }
    })
} catch (error) {
    response.status(400).json({
     status: "Error", 
     reCode: 400, 
     msg: "Request Not Available",
     isExist:false})
     return
 }
}

module.exports = {
    getOccupants,
    getElevaEvents,
    getEleva
}
