const bcrypt = require('bcrypt');
const pool = require("./database");

const createMaintanence = (request, response) => {
    try {
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            const { id, eleva_id, building_id, secretary_id, date, from_time, to_time } = request.body
            console.log({ date });
            if (error) {
                response.status(500).json({
                    status: "Error",
                    reCode: 500,
                    msg: "Failed to acquire a database connection",
                    isExist: false
                });
                return;
            }

            // Use the acquired connection to execute the database query
            client.query('INSERT INTO eleva.maintanence_details ( id,eleva_id,building_id,secretary_id,date,from_time,to_time ) VALUES ($1,$2,$3,$4,$5,$6,$7)',
                [id, eleva_id, building_id, secretary_id, date, from_time, to_time], (error, result) => {
                    // Release the connection back to the pool
                    client.release();
                    response.status(200).json({
                        status: "Sucess",
                        reCode: 200,
                        response: `${id},${eleva_id},${building_id},${secretary_id},${date},${from_time},${to_time}`,
                        msg: 'Maintanence Sheduled successfully'
                    });
                })
        });
    } catch (error) {
        response.status(400).json({
            status: "Error",
            reCode: 400,
            msg: "Maintanence Not Scheduled",
            isExist: false
        })
        return
    }
}


const getMaintanence = (request, response) => {
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
            const building_id = request.params.building_id
            // Use the acquired connection to execute the database query
            client.query('select * from eleva.maintanence_details where building_id = $1', [building_id], (error, result) => {
                console.log("error", error);
                client.release();
                if (!result.rows.length) {
                    response.status(200).json({
                        status: "Sucess",
                        reCode: 200,
                        response: `${building_id}`,
                        msg: "Maintanence Not Exisit",
                        isExist: false,
                    })
                    return
                }
                response.status(200).json({
                    status: "Sucess",
                    reCode: 200,
                    msg: "Maintanence Available",
                    isExist: true,
                    response: result.rows
                })
            })
        });
    } catch (error) {
        response.status(400).json({
            status: "Error",
            reCode: 400,
            msg: "Request Not Available",
            isExist: false,
            Error: error
        })
        console.log(error);
        return
    }

}

module.exports = {
    createMaintanence,
    getMaintanence
}
