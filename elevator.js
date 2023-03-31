
const bcrypt = require('bcrypt');
const { request } = require('express');

const pool = require("./database");

const getElevaDetails = (request, response) => {
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
            client.query('select * from eleva.eleva_details where eleva_id = $1', [id], (error, result) => {
                client.release();
                if (!result.rows.length) {
                    response.status(200).json({
                        status: "sucess",
                        reCode: 200,
                        response: `${id}`,
                        msg: "eleva Not Exist",
                        isExist: false
                    })
                    return
                } else {
                    response.status(200).json({
                        status: "sucess",
                        reCode: 200,
                        msg: "Eleva Available ",
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



const getBuildingDetails = (request, response) => {
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
            client.query('select * from eleva.eleva_details where building_id = $1', [building_id], (error, result) => {
                client.release();
                if (!result.rows.length) {
                    response.status(200).json({
                        status: "sucess",
                        reCode: 200,
                        response: `${building_id}`,
                        msg: "Building Not Exist",
                        isExist: false
                    })
                    return
                }
                else {
                    response.status(200).json({
                        status: "sucess",
                        reCode: 200,
                        msg: "Eleva Available",
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
    getElevaDetails,
    getBuildingDetails
}
