
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 9000,
    user: 'postgres',
    password: 'root',
    database: 'test'
});

const creatUser = (async (req, res) => {
    const { first_name, last_name, email_id, phone_number, password } = req.body;
    console.log(
        { first_name, last_name, email_id, phone_number, password }
    );
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    pool.query('SELECT * FROM eleva.occupants_details WHERE phone_number = $1', [phone_number], (error, results) => {
        if (error) {
            console.log(error);
        }
        console.log(results.rows);
        if (results.rows.length > 0) {
            res.status(500).json({ status: "error", resCode: 500, msg: "Phone number Already exist" });
        }
        else {
            pool.query(
                'INSERT INTO eleva.occupants_details (first_name, last_name, email_id, phone_number, password) VALUES ($1, $2, $3,$4,$5)',
                [first_name, last_name, email_id, phone_number, hashedPassword],
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


})





module.exports = {
    creatUser
}
