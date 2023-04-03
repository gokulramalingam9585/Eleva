const pool = require("./database");

const checkUserSecretary = (req, res) => {
    try {
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            if (error) {
                res.status(500).json({
                    status: "Error",
                    reCode: 500,
                    msg: "Failed to acquire a database connection",
                    isExist: false
                });
                return;
            }
            const phone_number = req.params.phone_number;
            client.query('SELECT * FROM secretary_details WHERE phone_number = $1', [phone_number], (error, results) => {
                client.release();
                if (error) {
                    console.log(`error : ${error}`);
                    res.status(500).json({
                        status: "Error",
                        reCode: 500,
                        msg: "Internal server error",
                        isExist: false
                    })
                    return;
                }
                if (results.rows.length > 0) {
                    res.status(200).json({
                        status: 'success',
                        resCode: 200,
                        response: `${phone_number}`,
                        msg: "Phone number Already exist",
                        isExist: true
                    });
                    return
                }
                res.status(200).json({
                    status: "success",
                    reCode: 200,
                    response: `${phone_number}`,
                    msg: "Phone number not Exist",
                    isExist: false
                })
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
        // Acquire a connection from the pool
        pool.connect((error, client) => {
            if (error) {
                res.status(500).json({
                    status: "Error",
                    reCode: 500,
                    msg: "Failed to acquire a database connection",
                    isExist: false
                });
                return;
            }
            const { secretary_id, first_name, last_name, email_id, phone_number, profile_url, building_id } = req.body;
            console.log(
                { secretary_id, first_name, last_name, email_id, phone_number, profile_url, building_id }
            );
            if (!phone_number) {
                res.status(400).json({
                    status: 'Error',
                    reCode: 400,
                    msg: "Please enter the Phone Number"
                })
                return
            } else {

                client.query('SELECT * FROM secretary_details WHERE phone_number = $1', [phone_number], (error, results) => {
                    console.log(results.rows);
                    if (error) {
                        client.release();
                        console.log(`error : ${error}`);
                        response.status(500).json({
                            status: "Error",
                            reCode: 500,
                            msg: "Internal server error",
                            isExist: false
                        })
                        return;
                    }
                    if (results.rows.length > 0) {
                        client.release();
                        res.status(200).json({
                            status: 'success',
                            resCode: 200,
                            response: `${phone_number}`,
                            msg: "Phone number Already exist",
                            isExist: true
                        });
                        return
                    }
                    else {
                        client.query(
                            'INSERT INTO secretary_details ( secretary_id,first_name, last_name, email_id, phone_number, profile_url,building_id ) VALUES ($1, $2, $3,$4,$5,$6,$7)',
                            [secretary_id, first_name, last_name, email_id, phone_number, profile_url, building_id],
                            (error, result) => {
                                client.release();
                                if (error) {
                                    console.log(`error : ${error}`);
                                    res.status(500).json({
                                        status: "Error",
                                        reCode: 500,
                                        msg: "Internal server error",
                                        isExist: false
                                    })
                                    return;
                                }

                                res.status(200).json({
                                    status: 'success',
                                    reCode: 200,
                                    response: `${secretary_id} ${first_name},${last_name},${email_id},${phone_number},${building_id}`,
                                    msg: `User Registered  Sucessfully`
                                });
                            }
                        );
                    }
                })
            }
        })
    } catch (error) {
        client.release();
        res.status(400).json({
            status: 'Error',
            reCode: 400,
            msg: "Invalid Request"
        })
        return
    }
}

const getUserSecretary = (request, response) => {
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
            console.log(`id : ${id}`);
            client.query('select * from secretary_details where secretary_id = $1', [id], (error, result) => {
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
                        response: `${id}`,
                        msg: "User Not Exist",
                        isExist: false
                    })
                    return
                }
                response.status(200).json({
                    status: "success",
                    reCode: 200,
                    msg: "Secretary Available",
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

const updateUserSecretaryName = (request, response) => {
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
            const secretary_id = request.params.id
            const { first_name, last_name } = request.body

            client.query('update secretary_details set first_name = $1,  last_name = $2 where secretary_id = $3', [first_name, last_name, secretary_id], (error, result) => {
                client.release()
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
                    status: 'success',
                    reCode: 200,
                    response: `${first_name},${last_name}`,
                    msg: `UserName updated sucessfully`
                })
            })
        })
    } catch (error) {
        response.status(400).json({
            status: 'Error',
            reCode: 400,
            msg: "Not Updated Sucessfully"
        })
        return
    }

}

const updateUserSecretaryEmail = (request, response) => {
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
            const secretary_id = request.params.id
            const { email_id } = request.body
            client.query('update secretary_details set email_id = $1 where secretary_id = $2', [email_id, secretary_id], (error, result) => {
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
                    status: 'success',
                    reCode: 200,
                    response: `${email_id}`,
                    msg: `UserEmail updated sucessfully`
                })
            })
        })
    } catch (error) {
        response.status(400).json({
            status: 'Error',
            reCode: 400,
            msg: "Not Updated Sucessfully"
        })
        return
    }
}

const updateUserSecretaryProfile = (request, response) => {
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
            const secretary_id = request.params.id
            console.log(`body : ${JSON.stringify(request.body)}`);
            const { profile_url } = request.body
            client.query('update secretary_details set profile_url = $1 where secretary_id = $2', [profile_url, secretary_id], (error, result) => {
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
                    status: 'success',
                    reCode: 200,
                    response: `${secretary_id},${profile_url}`,
                    msg: `UserProfile updated sucessfully`
                })
            })
        })
    } catch (error) {
        response.status(400).json({
            status: 'Error',
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
