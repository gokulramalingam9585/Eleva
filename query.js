
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



    pool.query(
        'INSERT INTO eleva.building_occupants_register (first_name, last_name, email_id, phone_number, password) VALUES ($1, $2, $3,$4,$5)',
        [first_name, last_name, email_id, phone_number, hashedPassword],
        (error, results) => {
            if (error) {
                res.status(400).send(`Bad request`);
            }
            console.log(results.rows);
            res.status(200).send(`User with ${email_id} registerd successfully `);
        }
    );

})




module.exports = {
    creatUser
}
