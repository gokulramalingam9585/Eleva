const pool = require("./database");

const getOccupants = (request, response) => {
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
            client.query('select * from occupants_details where building_id = $1', [building_id], (error, result) => {
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
                        msg: "User Not Exist",
                        isExist: false
                    })
                    return;
                }
                response.status(200).json(
                    {
                        status: "Success",
                        reCode: 200,
                        msg: "Occupants Available",
                        isExist: true,
                        response: result.rows
                    }
                )
            })
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
            client.query('select * from events_details where id = $1', [id], (error, result) => {
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
                        response: `${id}`,
                        msg: "Events Not Exisit",
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
        return
    }
}

const getEleva = (request, response) => {
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
            const eleva_id = request.params.eleva_id
            client.query('select * from eleva_details where eleva_id = $1', [eleva_id], (error, result) => {
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
                        status: "success",
                        reCode: 200,
                        response: `${eleva_id}`,
                        msg: "eleva Not Exist",
                        isExist: false
                    })
                    return
                }
                else {
                    response.status(200).json({
                        status: "success",
                        reCode: 200,
                        msg: "Elevator Available",
                        isExist: true,
                        response: result.rows
                    })
                }
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

module.exports = {
    getOccupants,
    getElevaEvents,
    getEleva
}
