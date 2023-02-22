
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'shalla',
    database: 'eleva'
});



const checkUserSecretary = (req, res) => {
    const phone_number = req.params.phone_number;
    pool.query('SELECT * FROM eleva.secretary_details WHERE phone_number = $1', [phone_number], (error, results) => {
        if (error) {
            return res.status(400).json({
                status: false,
                reCode: 400,
                msg: "Not Found"
            })
        }

        if (results.rows.length > 0) {
            return res.status(200).json({
                status: 'sucess',
                resCode: 200,
                response: `${phone_number}`,
                msg: "Phone number Already exist",
                isExist: true
            });
        }
        res.status(200).json({
            status: "sucess",
            reCode: 200,
            msg: "Pnone number not Exist",
            isExist: false
        })
    })
};

const creatUserSecretary = (req, res) => {
    const { secretary_id, first_name, last_name, email_id, phone_number, profile_url, building_id, eleva_id } = req.body;
    console.log(
        { secretary_id, first_name, last_name, email_id, phone_number, profile_url, building_id, eleva_id }
    );
    if (!phone_number) {
        res.status(400).json({ status: false, reCode: 400, msg: "Please enter the Phone Number" })
    } else {

        pool.query('SELECT * FROM eleva.secretary_details WHERE phone_number = $1', [phone_number], (error, results) => {
            if (error) {
                return res.status(400).json({
                    status: false,
                    reCode: 400,
                    msg: "Invalid Request"
                })
            }
            console.log(results.rows);
            if (results.rows.length > 0) {
                return res.status(200).json({
                    status: 'sucess',
                    resCode: 200,
                    response: `${phone_number}`,
                    msg: "Phone number Already exist",
                    isExist: true
                });
            }
            else {
                pool.query(
                    'INSERT INTO eleva.secretary_details ( secretary_id,first_name, last_name, email_id, phone_number, profile_url,building_id,eleva_id ) VALUES ($1, $2, $3,$4,$5,$6,$7,$8)',
                    [secretary_id, first_name, last_name, email_id, phone_number, profile_url, building_id, eleva_id],
                    (error, result) => {
                        if (error) {
                            return res.status(400).json({
                                status: false,
                                reCode: 400,
                                msg: "Not Registerd Sucessfully"
                            });
                        }
                        console.log(result.rows);
                        res.status(200).json({
                            status: true,
                            reCode: 200,
                            msg: `User with ${secretary_id} ${first_name},${last_name},${email_id},${phone_number} sucessfully Registerd`
                        });
                    }
                );
            }
        })
    }
}

const getUserSecretary = (request, response) => {
    const id = request.params.id
    pool.query('select * from eleva.secretary_details where secretary_id = $1', [id], (error, result) => {
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
                status: "sucess",
                reCode: 200,
                response: `${id}`,
                msg: "User Not Exist",
                isExist: false
            })
        }
        else {
            response.status(200).json(result.rows)
        }
    })
}

const updateUserSecretary = (request, response) => {
    const secretary_id = parseInt(request.params.id)
    const { first_name, last_name, email_id, profile_url } = request.body

    pool.query('update eleva.secretary_details set first_name = $1,  last_name = $2, email_id = $3, profile_url = $4 where secretary_id = $5', [first_name, last_name, email_id, profile_url, secretary_id], (error, result) => {
        if (error) {
            return response.status(400).json({
                status: false,
                reCode: 400,
                msg: "Not Updated Sucessfully"
            })
        }
        response.status(200).json({
            status: true,
            reCode: 200,
            msg: `User with Id :${secretary_id} updated sucessfully`
        })
    })
}



module.exports = {

    checkUserSecretary,
    creatUserSecretary,
    getUserSecretary,
    updateUserSecretary
}
