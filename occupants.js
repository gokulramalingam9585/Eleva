const bcrypt = require('bcrypt');
const pool = require("./database");

const CheckuserOccupants = (req, res) => {
    try {
        const phone_number = req.params.phone_number;
        pool.query('SELECT * FROM occupants_details WHERE phone_number = $1', [phone_number], (error, results) => {

            if (results.rows.length > 0) {
                res.status(200).json({
                    status: "sucess",
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
                msg: "Pnone number not Exist",
                isExist: false
            })
        })
    } catch (error) {
        console.log('error : ' + error);
        res.status(400).json({
            status: "error",
            reCode: 400,
            msg: "Request Unavailable"
        })
        return
    }
};

const creatUserOccupants = (req, res) => {
    try {
        console.log('data : ', JSON.stringify(req.body));
        const { user_id, first_name, last_name, email_id, phone_number, profile_url, building_id, floor_no } = req.body;
        console.log(
            { user_id, first_name, last_name, email_id, phone_number, profile_url, building_id, floor_no }
        );
        if (!phone_number) {
            res.status(400).json({
                status: false,
                reCode: 400,
                msg: "Please enter the Phone Number"
            })
            return
        } else {
            pool.query('SELECT * FROM occupants_details WHERE phone_number = $1', [phone_number], (error, results) => {
                console.log('error : ', error);
                console.log(results.rows);
                if (results.rows.length > 0) {
                    res.status(200).json({
                        status: "sucess",
                        resCode: 200,
                        response: `${phone_number}`,
                        msg: "Phone number Already exist",
                        isExist: true
                    });
                    return
                }
                else {
                    pool.query(
                        'INSERT INTO occupants_details ( user_id,first_name, last_name, email_id, phone_number, profile_url,building_id,floor_no ) VALUES ($1, $2, $3,$4,$5,$6,$7,$8)',
                        [user_id, first_name, last_name, email_id, phone_number, profile_url, building_id, floor_no],
                        (error, result) => {
                            if (error) {
                                res.status(400).json({
                                    status: "error",
                                    reCode: 400,
                                    msg: "Not Registerd Sucessfully",
                                    isExist: false
                                });
                                return
                            }
                            console.log(result.rows);
                            res.status(200).json({
                                status: "sucess",
                                reCode: 200,
                                response: `${user_id} ${first_name},${last_name},${email_id},${phone_number},${profile_url},${building_id},${floor_no}`,
                                msg: `User with sucessfully Registerd`,
                                isExist: false
                            });
                        }
                    );
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "error",
            reCode: 400,
            msg: "Invalid Request",
            isExist: false
        })
        return
    }

}

const getUserOccupants = (request, response) => {
    try {
        const user_id = request.params.user_id
        pool.query('select * from occupants_details where user_id = $1', [user_id], (error, result) => {
            if (!result.rows.length) {
                response.status(200).json({
                    status: "Sucess",
                    reCode: 200,
                    response: `${user_id}`,
                    msg: "User Not Exist",
                    isExist: false
                })
            }
            response.status(200).json({
                status: "Sucess",
                reCode: 200,
                msg: "Occupants Available",
                isExist: true,
                response: result.rows,
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
const getBuildingOccupants = (request, response) => {
    try {
        const building_id = request.params.building_id
        pool.query('select * from occupants_details where building_id = $1', [building_id], (error, result) => {
            if (!result.rows.length) {
                response.status(200).json({
                    status: "Sucess",
                    reCode: 200,
                    response: `${building_id}`,
                    msg: "User Not Exist",
                    isExist: false
                })
                return;
            }
            response.status(200).json(
                {
                    status: "Sucess",
                    reCode: 200,
                    msg: "Occupants Available",
                    isExist: true,
                    response: result.rows
                }
            )
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

const updateUserOccupantsName = (request, response) => {
    try {
        const user_id = request.params.user_id
        const { first_name, last_name } = request.body
        pool.query('update occupants_details set first_name = $1,  last_name = $2 where user_id = $3', [first_name, last_name, user_id], (error, result) => {
            response.status(200).json({
                status: true,
                reCode: 200,
                response: `${first_name}`,
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

const updateUserOccupantsEmail = (request, response) => {
    try {
        const user_id = request.params.user_id
        const { email_id } = request.body
        pool.query('update occupants_details set email_id = $1 where user_id = $2', [email_id, user_id], (error, result) => {
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

const updateUserOccupantsProfile = (request, response) => {
    try {
        const user_id = request.params.user_id
        const { profile_url } = request.body
        pool.query('update occupants_details set profile_url = $1 where user_id = $2', [profile_url, user_id], (error, result) => {
            response.status(200).json({
                status: true,
                reCode: 200,
                response: `${profile_url}`,
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

const updateUserOccupantsFloorNo = (request, response) => {
    try {
        const user_id = request.params.user_id
        const { floor_no } = request.body
        pool.query('update occupants_details set floor_no = $1 where user_id = $2', [floor_no, user_id], (error, result) => {
            response.status(200).json({
                status: true,
                reCode: 200,
                response: `${floor_no}`,
                msg: `User updated sucessfully`
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
    CheckuserOccupants,
    creatUserOccupants,
    getUserOccupants,
    updateUserOccupantsName,
    updateUserOccupantsEmail,
    updateUserOccupantsProfile,
    updateUserOccupantsFloorNo,
    getBuildingOccupants
}