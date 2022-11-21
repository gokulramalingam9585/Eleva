
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
    const { FirstName, LastName, Email_Id, Phone_Number, Password } = req.body;
    console.log(
        { FirstName, LastName, Email_Id, Phone_Number, Password }
    );


    hashedPassword = await bcrypt.hash(Password, 10);
    console.log(hashedPassword);



    pool.query(
        'INSERT INTO BULDING_OCCUPANTS.REGISTER (FirstName,LastName,Email_Id,Phone_Number,Password) VALUES ($1, $2, $3,$4,$5)',
        [FirstName, LastName, Email_Id, Phone_Number, hashedPassword],
        (error, results) => {
            if (error) {
                throw error
            }
            console.log(results.rows);
            res.status(200).send(`User with ${Email_Id} registerd successfully `);
        }
    );

})




module.exports = {
    creatUser
}
