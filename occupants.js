const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 9000,
    user: 'postgres',
    password: 'root',
    database: 'test'
});

const CheckuserOccupants = (req, res) => {
    const phone_number = parseInt(req.params.phone_number);
    pool.query('SELECT * FROM eleva.occupants_details WHERE phone_number = $1', [phone_number], (error, results) => {
        if (error) {
            res.status(400).json({ status: "error", reCode: 400, msg: "Request Unavailable" })
        }
        // console.log(results.rows);
        // if (!phone_number) {
        //     res.status(400).json({ status: "error", reCode: 400, msg: "Please enter the Phone Number",isExist:false })
        // }
        if (results.rows.length > 0) {
            res.status(200).json({ status: "sucess", resCode: 200, msg: "Phone number Already exist",isExist:true });
        }
        else {
            res.status(200).json({ status: "sucess", reCode:200 ,msg:"Pnone number not Exist",isExist:false })
        }
    })
};

const creatUserOccupants = (req, res) => {
    const { user_id, first_name, last_name, email_id, phone_number, profile_url,building_id,floor_no } = req.body;
    console.log(
        { user_id, first_name, last_name, email_id, phone_number, profile_url,building_id,floor_no }
    );
    if (!phone_number) {
        res.status(400).json({ status: false, reCode: 400, msg: "Please enter the Phone Number" })
    } else {
        pool.query('SELECT * FROM eleva.occupants_details WHERE phone_number = $1', [phone_number], (error, results) => {
            if (error) {
                res.status(400).json({ status: "error", reCode: 400, msg: "Invalid Request",isExist:false })
            }
            console.log(results.rows);
            if (results.rows.length > 0) {
                res.status(200).json({ status: "sucess", resCode: 200, msg: "Phone number Already exist",isExist:true });
            }
            else {
                pool.query(
                    'INSERT INTO eleva.occupants_details ( user_id,first_name, last_name, email_id, phone_number, profile_url,building_id,floor_no ) VALUES ($1, $2, $3,$4,$5,$6,$7,$8)',
                    [user_id, first_name, last_name, email_id, phone_number, profile_url,building_id,floor_no],
                    (error, result) => {
                        if (error) {
                            res.status(400).json({ status: "error", reCode: 400, msg: "Not Registerd Sucessfully",isExist:false });
                        }
                        console.log(result.rows);
                        res.status(200).json({ status: "sucess", reCode: 200, msg: `User with ${user_id} ${first_name},${last_name},${email_id},${phone_number} sucessfully Registerd`,isExist:false });
                    }
                );
            }
        })
    }
}

const getUserOccupants = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('select * from eleva.occupants_details where user_id = $1', [id], (error, result) => {
        if (error) {
            response.status(400).json({ status: "Error", reCode: 400, msg: "Request Not Available",isExist:false })
        }
        if (!result.rows.length) {
            response.status(200).json({ status: "Sucess", reCode: 200, msg: "User Not Exist",isExist:false })
        }
        else {
            response.status(200).json(result.rows)
        }
    })
}

const updateUserOccupants = (request,response) => {
    const user_id = parseInt(request.params.id)
    const { first_name,last_name,email_id,profile_url } = request.body

    pool.query('update eleva.occupants_details set first_name = $1,  last_name = $2, email_id = $3, profile_url = $4 where user_id = $5',[first_name,last_name,email_id,profile_url,user_id],(error,result)=>{
        if(error){
            response.status(400).json({status: false, reCode: 400, msg: "Not Updated Sucessfully"})
        }
        response.status(200).json({status:true,reCode:200,msg:`User with Id :${user_id} updated sucessfully`})
    })
}

module.exports = {
    CheckuserOccupants,
    creatUserOccupants,
    getUserOccupants,
    updateUserOccupants,
}