
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 9000,
    user: 'postgres',
    password: 'root',
    database: 'test'
});

const Checkuser = (req, res) => {
    const { phone_number } = req.body;
    pool.query('SELECT * FROM eleva.occupants_details WHERE phone_number = $1', [phone_number], (error, results) => {
        if (error) {
            res.status(400).json({ status: "error", reCode: 400, msg: "Not Found" })
        }
        // console.log(results.rows);
        if (!phone_number) {
            res.status(400).json({ status: "error", reCode: 400, msg: "Please enter the Phone Number" })
        }
        if (results.rows.length > 0) {
            res.status(500).json({ status: "error", resCode: 500, msg: "Phone number Already exist" });
        }
        else {
            res.status(200).json({ status: "sucess", reCode: 200, msh: `User with ${phone_number} sucessfully Registerd` })
        }
    })

};

const creatUser = (async (req, res) => {
    const { first_name, last_name, email_id, phone_number, password, profile_url } = req.body;
    console.log(
        { first_name, last_name, email_id, phone_number, password, profile_url }
    );
    if (!phone_number) {
        res.status(400).json({ status: "error", reCode: 400, msg: "Please enter the Phone Number" })
    } else {
        hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        pool.query('SELECT * FROM eleva.occupants_details WHERE phone_number = $1', [phone_number], (error, results) => {
            if (error) {
                res.status(400).json({ status: "error", reCode: 400, msg: "Invalid Request" })
            }
            console.log(results.rows);
            if (results.rows.length > 0) {
                res.status(500).json({ status: "error", resCode: 500, msg: "Phone number Already exist" });
            }
            else {
                pool.query(
                    'INSERT INTO eleva.occupants_details (first_name, last_name, email_id, phone_number, password,profile_url) VALUES ($1, $2, $3,$4,$5,$6)',
                    [first_name, last_name, email_id, phone_number, hashedPassword, profile_url],
                    (error, results) => {
                        if (error) {
                            res.status(400).json({ status: "error", reCode: 400, msg: "Not Registerd Sucessfully" });
                        }
                        console.log(results.rows);
                        res.status(200).json({ status: "sucess", reCode: 200, msg: `User with ${first_name},${last_name},${email_id},${phone_number} sucessfully Registerd` });
                    }
                );
            }

        })
    }


})

const getUsers = (request, response) => {
    const phone_number = parseInt(request.params.phone_number)
    pool.query('select * from eleva.occupants_details where phone_number = $1', [phone_number], (error, result) => {
        if (error) {
            res.status(400).json({ status: "error", reCode: 400, msg: "Request Not Available" })
        }
        response.status(200).json(result.rows)
    })
}





module.exports = {
    Checkuser,
    creatUser,
    getUsers


}
