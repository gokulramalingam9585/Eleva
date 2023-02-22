const bcrypt = require('bcrypt');
const pool = require("./database");

const checkUserSecretary = (req, res) => {
    try {
        const phone_number = req.params.phone_number;
        pool.query('SELECT * FROM eleva.secretary_details WHERE phone_number = $1', [phone_number], (error, results) => {
            if (results.rows.length > 0) {
                res.status(200).json({
                    status: 'sucess',
                    resCode: 200,
                    response: `${phone_number}`,
                    msg: "Phone number Already exist",
                    isExist: true
                });
                return
            }
            res.status(200).json({
                status: "sucess",
                reCode: 200,
                response: `${phone_number}`,
                msg: "Phone number not Exist",
                isExist: false
            })
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            reCode: 400,
            msg: "Not Found"
        })
        return
    }
}

const creatUserSecretary = (req, res) => {
    try {
        const { secretary_id, first_name, last_name, email_id, phone_number, profile_url, building_id, eleva_id } = req.body;
        console.log(
            { secretary_id, first_name, last_name, email_id, phone_number, profile_url, building_id, eleva_id }
        );
        if (!phone_number) {
            res.status(400).json({
                status: false,
                reCode: 400,
                msg: "Please enter the Phone Number"
            })
            return
        } else {

            pool.query('SELECT * FROM eleva.secretary_details WHERE phone_number = $1', [phone_number], (error, results) => {
                console.log(results.rows);
                if (results.rows.length > 0) {
                    res.status(200).json({
                        status: 'sucess',
                        resCode: 200,
                        response: `${phone_number}`,
                        msg: "Phone number Already exist",
                        isExist: true
                    });
                    return
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
                                response: `${secretary_id} ${first_name},${last_name},${email_id},${phone_number},${building_id},${eleva_id}`,
                                msg: `User Registerd  Sucessfully`
                            });
                        }
                    );
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            reCode: 400,
            msg: "Invalid Request"
        })
        return
    }
}

const getUserSecretary = (request, response) => {
    try {
        const id = request.params.id
        pool.query('select * from eleva.secretary_details where secretary_id = $1', [id], (error, result) => {
            if (!result.rows.length) {
                response.status(200).json({
                    status: "sucess",
                    reCode: 200,
                    response: `${id}`,
                    msg: "User Not Exist",
                    isExist: false
                })
                return
            }
            response.status(200).json({
                status: "sucess",
                reCode: 200,
                msg: "Secretary Available",
                isExist: true,
                response: result.rows
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

// const updateUserSecretary = (request, response) => {
// try{     
//     const secretary_id = parseInt(request.params.id)
//     const { first_name, last_name, email_id, profile_url } = request.body

//     pool.query('update eleva.secretary_details set first_name = $1,  last_name = $2, email_id = $3, profile_url = $4 where secretary_id = $5', [first_name, last_name, email_id, profile_url, secretary_id], (error, result) => {
//          response.status(200).json({
//             status: true,
//             reCode: 200,
//             response:`${secretary_id},${first_name},${last_name},${email_id},${profile_url}`,
//             msg: `User updated sucessfully`
//         })
//     })
// } catch(error) {
//     response.status(400).json({
//        status: false,
//        reCode: 400,
//        msg: "Not Updated Sucessfully"
//    })
//    return
// }
// }

const updateUserSecretaryName = (request, response) => {
    try {
        const secretary_id = request.params.id
        const { first_name, last_name } = request.body

        pool.query('update eleva.secretary_details set first_name = $1,  last_name = $2 where secretary_id = $3', [first_name, last_name, secretary_id], (error, result) => {
            response.status(200).json({
                status: true,
                reCode: 200,
                response: `${first_name},${last_name}`,
                msg: `UserName updated sucessfully`
            })
        })
    } catch (error) {
        response.status(400).json({
            status: false,
            reCode: 400,
            msg: "Not Updated Sucessfully"
        })
        return
    }

}

const updateUserSecretaryEmail = (request, response) => {
    try {
        const secretary_id = request.params.id
        const { email_id } = request.body
        pool.query('update eleva.secretary_details set email_id = $1 where secretary_id = $2', [email_id, secretary_id], (error, result) => {
            response.status(200).json({
                status: true,
                reCode: 200,
                response: `${email_id}`,
                msg: `UserEmail updated sucessfully`
            })
        })
    } catch (error) {
        response.status(400).json({
            status: false,
            reCode: 400,
            msg: "Not Updated Sucessfully"
        })
        return
    }
}

const updateUserSecretaryProfile = (request, response) => {
    try {
        const secretary_id = request.params.id
        const { profile_url } = request.body
        pool.query('update eleva.secretary_details set profile_url = $1 where secretary_id = $2', [profile_url, secretary_id], (error, result) => {
            response.status(200).json({
                status: true,
                reCode: 200,
                response: `${secretary_id},${first_name},${last_name},${email_id},${profile_url}`,
                msg: `UserProfile updated sucessfully`
            })
        })
    } catch (error) {
        response.status(400).json({
            status: false,
            reCode: 400,
            msg: "Not Updated Sucessfully"
        })
        return
    }
}

module.exports = {
    checkUserSecretary,
    creatUserSecretary,
    getUserSecretary,
    updateUserSecretaryName,
    updateUserSecretaryEmail,
    updateUserSecretaryProfile
}