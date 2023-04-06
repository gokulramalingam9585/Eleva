const pool = require("./database");

const createMaintanence = (request, response) => {
    try {
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            const { eleva_id, building_id, secretary_id, date, from_time, to_time } = request.body
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
            client.query('INSERT INTO maintanence_details (eleva_id,building_id,secretary_id,date,from_time,to_time ) VALUES ($1,$2,$3,$4,$5,$6)',
                [eleva_id, building_id, secretary_id, date, from_time, to_time], (error, result) => {
                    // Release the connection back to the pool
                    client.release();
                    if (error) {
                        console.log(`error : ${error}`);
                        response.status(500).json({
                            status: "Error",
                            reCode: 500,
                            msg: "Internal server error",
                            isExist: false
                        })
                        return;
                    }
                    response.status(200).json({
                        status: "Sucess",
                        reCode: 200,
                        response: `${eleva_id},${building_id},${secretary_id},${date},${from_time},${to_time}`,
                        msg: 'Maintanence Scheduled successfully'
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

    console.log(`request.url : ${request.url}`);
    var isCurrentDate;
    const urlPath = request.url;
    if (urlPath.includes('cd_')) {
        console.log('url matched');
        isCurrentDate = true;
    } else {
        console.log('url not matched');
        isCurrentDate = false;
    }
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
            const current_date = request.params.current_date

            console.log(`current_date : ${current_date}`);
            // Use the acquired connection to execute the database query

            var query = '';
            if (isCurrentDate) {
                query = 'select * from maintanence_details where building_id = $1 and date = $2 order by date ASC';
            }
            else {
                query = 'select * from maintanence_details where building_id = $1 and date >= $2 order by date ASC';
            }
            client.query(query, [building_id, current_date], (error, result) => {
                console.log("error", error);
                client.release();
                if (error) {
                    console.log(`error : ${error}`);
                    response.status(500).json({
                        status: "Error",
                        reCode: 500,
                        msg: "Internal server error",
                        isExist: false
                    })
                    return;
                }
                if (!result.rows.length) {
                    response.status(200).json({
                        status: "Success",
                        reCode: 200,
                        response: `${building_id}`,
                        msg: "Maintanence Not Exist",
                        isExist: false,
                    })
                    return
                }
                response.status(200).json({
                    status: "Success",
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
