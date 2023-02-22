
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'shalla',
    database: 'eleva'
});

const createMaintanence = (request, response) => {
    const {eleva_id, building_id, secretary_id, date, from_time, to_time } = request.body

    console.log({ date });

    pool.query('INSERT INTO maintanence_details (eleva_id,building_id,secretary_id,date,from_time,to_time) VALUES ($1,$2,$3,$4,$5,$6)',
        [eleva_id, building_id, secretary_id, date, from_time, to_time], (error, result) => {

            console.log('error : '+error);
            if (error) {
                return response.status(400).json({
                    status: "Error",
                    reCode: 400,
                    msg: "Maintanence Not Scheduled",
                    isExist: false
                })

            }
             response.status(200).json({
                status: "Sucess",
                reCode: 200,
                msg: `Maintanence Scheduled successfully with Eleva Id : ${eleva_id}`
            });
        })
}

const getMaintanence = (request, response) => {
    const building_id = request.params.building_id+""
    const date = request.params.date
    pool.query('select * from maintanence_details where building_id = $1 and date >= $2 order by date asc', [building_id,date], (error, result) => {
        if (error) {
            response.status(400).json({
               status: "Error",
               reCode: 400,
               msg: "Request Not Available",
               isExist: false
           })
           return
       }
       if (!result.rows.length) {
            response.status(200).json({
               status: "Sucess",
               reCode: 200,
               response: `${building_id}`,
               msg: "Maintenance Not Exist",
               isExist: false
           })
           return
       }
       response.status(200).json({
           status: "Success",
           reCode: 200,
           msg: "Maintenance Exist",
           isExist: true,
           response: result.rows 
       })
    })
}


module.exports = {
    createMaintanence,
    getMaintanence
}
