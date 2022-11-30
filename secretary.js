
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
    const phone_number = parseInt.params.phone_number;
    pool.query('SELECT * FROM eleva.secretary_details WHERE phone_number = $1', [phone_number], (error, results) => {
        if (error) {
            res.status(400).json({ status: false, reCode: 400, msg: "Not Found" })
        }
        // console.log(results.rows);
        if (!phone_number) {
            res.status(400).json({ status: false, reCode: 400, msg: "Please enter the Phone Number" })
        }
        if (results.rows.length > 0) {
            res.status(500).json({ status: false, resCode: 500, msg: "Phone number Already exist" });
        }
        else {
            res.status(200).json({ status: true, reCode: 200, msg: `User with ${phone_number} sucessfully exist` })
        }
    })
};

const creatUserSecretary = (async (req, res) => {
    const { id, first_name, last_name, email_id, phone_number, password, profile_url } = req.body;
    console.log(
        { id, first_name, last_name, email_id, phone_number, password, profile_url }
    );
    if (!phone_number) {
        res.status(400).json({ status: false, reCode: 400, msg: "Please enter the Phone Number" })
    } else {
        hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        pool.query('SELECT * FROM eleva.secretary_details WHERE phone_number = $1', [phone_number], (error, results) => {
            if (error) {
                res.status(400).json({ status: false, reCode: 400, msg: "Invalid Request" })
            }
            console.log(results.rows);
            if (results.rows.length > 0) {
                res.status(500).json({ status: false, resCode: 500, msg: "Phone number Already exist" });
            }
            else {
                pool.query(
                    'INSERT INTO eleva.secretary_details ( id,first_name, last_name, email_id, phone_number, password, profile_url ) VALUES ($1, $2, $3,$4,$5,$6,$7)',
                    [id, first_name, last_name, email_id, phone_number, hashedPassword, profile_url],
                    (error, result) => {
                        if (error) {
                            res.status(400).json({ status: false, reCode: 400, msg: "Not Registerd Sucessfully" });
                        }
                        console.log(result.rows);
                        res.status(200).json({ status: true, reCode: 200, msg: `User with ${id} ${first_name},${last_name},${email_id},${phone_number} sucessfully Registerd` });
                    }
                );
            }
        })
    }
})

const getUserSecretary = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('select * from eleva.secretary_details where id = $1', [id], (error, result) => {
        if (error) {
            response.status(400).json({ status: false, reCode: 400, msg: "Request Not Available" })
        }
        if (!result.rows.length) {
            response.status(400).json({ status: false, reCode: 400, msg: "User Not Exist" })
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
