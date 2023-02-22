
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'shalla',
    database: 'eleva'
});


const getOccupants = (request, response) => {
    const id = request.params.id
    pool.query('select * from occupants_details where user_id = $1', [id], (error, result) => {
        if (error) {
            return response.status(400).json({
                status: "Error",
                reCode: 400,
                msg: "Request Not Available",
                isExist: false
            })
        }
        if (!result.rows.length) {
            response.status(200).json({
                status: "Sucess",
                reCode: 200,
                response: `${id}`,
                msg: "User Not Exist",
                isExist: false
            })
        }
        response.status(200).json(result.rows)
    })
}

const getElevaEvents = (request, response) => {
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

const getEleva = (request, response) => {
    const id = request.params.id
    pool.query('select * from eleva_details where eleva_id = $1', [id], (error, result) => {
        if (error) {
           return response.status(400).json({
            status: "Error", 
            reCode: 400, 
            msg: "Request Not Available",
            isExist:false})
        }
        if (!result.rows.length) {
            return response.status(200).json({ 
                status: "sucess", 
                reCode: 200, 
                msg: "eleva Not Exist",
                isExist:false })
        }
        else {
            response.status(200).json(result.rows)
        }
    })
}

module.exports = {
    getOccupants,
    getElevaEvents,
    getEleva
}
