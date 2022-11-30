
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 9000,
    user: 'postgres',
    password: 'root',
    database: 'test'
});



const checkUserSecretary = (req, res) => {
    const phone_number = parseInt(req.params.phone_number);
    pool.query('SELECT * FROM eleva.secretary_details WHERE phone_number = $1', [phone_number], (error, results) => {
        if (error) {
            res.status(400).json({ status: false, reCode: 400, msg: "Not Found" })
        }
        // console.log(results.rows);
        // if (!phone_number) {
        //     res.status(400).json({ status: false, reCode: 400, msg: "Please enter the Phone Number" })
        // }
        if (results.rows.length > 0) {
            res.status(200).json({ status: 'sucess', resCode: 200, msg: "Phone number Already exist",isExist:true });
        }
        else {
            res.status(200).json({ status: "sucess", reCode:200 ,msg:"Pnone number not Exist",isExist:false })
        }
    })
};

const creatUserSecretary = (req, res) => {
    const { secretary_id, first_name, last_name, email_id, phone_number, profile_url,building_id,floor_no } = req.body;
    console.log(
        { secretary_id, first_name, last_name, email_id, phone_number, profile_url,building_id,floor_no }
    );
    if (!phone_number) {
        res.status(400).json({ status: false, reCode: 400, msg: "Please enter the Phone Number" })
    } else {
        
        pool.query('SELECT * FROM eleva.secretary_details WHERE phone_number = $1', [phone_number], (error, results) => {
            if (error) {
                res.status(400).json({ status: false, reCode: 400, msg: "Invalid Request" })
            }
            console.log(results.rows);
            if (results.rows.length > 0) {
                res.status(200).json({ status: 'sucess', resCode: 200, msg: "Phone number Already exist",isExist:true });
            }
            else {
                pool.query(
                    'INSERT INTO eleva.secretary_details ( secretary_id,first_name, last_name, email_id, phone_number, profile_url,building_id,floor_no ) VALUES ($1, $2, $3,$4,$5,$6,$7,$8)',
                    [secretary_id, first_name, last_name, email_id, phone_number, profile_url,building_id,floor_no],
                    (error, result) => {
                        if (error) {
                            res.status(400).json({ status: false, reCode: 400, msg: "Not Registerd Sucessfully" });
                        }
                        console.log(result.rows);
                        res.status(200).json({ status: true, reCode: 200, msg: `User with ${secretary_id} ${first_name},${last_name},${email_id},${phone_number} sucessfully Registerd` });
                    }
                );
            }
        })
    }
}

const getUserSecretary = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('select * from eleva.secretary_details where secretary_id = $1', [id], (error, result) => {
        if (error) {
            response.status(400).json({status: "Error", reCode: 400, msg: "Request Not Available",isExist:false})
        }
        if (!result.rows.length) {
            response.status(200).json({ status: "sucess", reCode: 200, msg: "User Not Exist",isExist:false })
        }
        else {
            response.status(200).json(result.rows)
        }
    })
}



module.exports = {
    
    checkUserSecretary,
    creatUserSecretary,
    getUserSecretary
}
