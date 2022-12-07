
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 9000,
    user: 'postgres',
    password: 'root',
    database: 'test'
});

const createMaintanence = (request, response) => {
    const { id, eleva_id, building_id, secretary_id, date, from_time, to_time } = request.body

    console.log({ date });

    pool.query('INSERT INTO eleva.maintanence_details ( id,eleva_id,building_id,secretary_id,date,from_time,to_time ) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [id, eleva_id, building_id, secretary_id, date, from_time, to_time], (error, result) => {
            if (error) {
                response.status(400).json({
                    status: "Error",
                    reCode: 400,
                    msg: "Maintanence Not Sheduled",
                    isExist: false
                })

            }
            response.status(200).json({
                status: "Sucess",
                reCode: 200,
                msg: `Maintanence Sheduled successfully with Id : ${id}`
            });
        })
}

const getmaintanence = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('select * from eleva.maintanence_details where id = $1', [id], (error, result) => {
        if (error) {
            response.status(400).json({
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
                msg: "Maintanence Not Exisit",
                isExist: false
            })
        }
        response.status(200).json(result.rows)
    })
}


module.exports = {
    createMaintanence,
    getmaintanence
}
