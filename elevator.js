
const bcrypt = require('bcrypt');
const { request } = require('express');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'shalla',
    database: 'eleva'
});

const getElevaDetails = (request, response) => {
    const id = request.params.id
    pool.query('select * from eleva_details where eleva_id = $1', [id], (error, result) => {
        if (error) {
           return response.status(400).json({status: "Error", reCode: 400, msg: "Request Not Available",isExist:false})
        }
        if (!result.rows.length) {
            return response.status(200).json({ status: "sucess", reCode: 200, msg: "eleva Not Exist",isExist:false })
        }
        else {
            response.status(200).json(result.rows)
        }
    })
}

const getBuildingDetails = (request,response) =>{
    const id = request.params.id
    pool.query('select * from eleva_details where building_id = $1',[id],(error,result) => {
        if (error){
            return response.status(400).json({status: "Error", reCode: 400, msg: "Request Not Available",isExist:false})
        }
        if (!result.rows.length){
             return response.status(200).json({ status: "sucess", reCode: 200, msg: "Building Not Exist",isExist:false })
        }
        else {
            response.status(200).json(result.rows)
        }
    })
}





module.exports = {
    getElevaDetails,
    getBuildingDetails

}
