const pool = require("./database");

pool.connect();
const createTables = () => {
    const createEventsDetails = `CREATE TABLE IF NOT EXISTS events_details
    (
        id integer NOT NULL,
        title text ,
        details text ,
        date date,
        from_time time without time zone,
        to_time time without time zone,
        location text ,
        status character varying ,
        cancel_reason text ,
        denied_reason text ,
        building_id text ,
        created_by character varying ,
        creator_id text ,
        secretary_notes text ,
        CONSTRAINT events_details_pkey PRIMARY KEY (id)
    )`;

    const createOccupantsDetails = `CREATE TABLE IF NOT EXISTS occupants_details
    (
        user_id text  NOT NULL,
        first_name character varying  NOT NULL,
        last_name character varying ,
        email_id character varying ,
        phone_number character varying ,
        profile_url character varying ,
        building_id text  NOT NULL,
        floor_no integer NOT NULL,
        CONSTRAINT occupants_details_pkey PRIMARY KEY (user_id)
    )`;

    const createSecretaryDetails = `CREATE TABLE IF NOT EXISTS secretary_details
    (
        secretary_id text  NOT NULL,
        first_name character varying  NOT NULL,
        last_name character varying ,
        email_id character varying ,
        phone_number character varying  NOT NULL,
        profile_url character varying ,
        building_id text  NOT NULL,
        eleva_id integer NOT NULL,
        CONSTRAINT secretary_details_pkey PRIMARY KEY (secretary_id)
    )`
        ;

    const createMaintanenceDetails = `CREATE TABLE IF NOT EXISTS maintanence_details
    (
        id integer NOT NULL,
        eleva_id text  NOT NULL,
        building_id text  NOT NULL,
        secretary_id text  NOT NULL,
        date date,
        from_time time without time zone,
        to_time time without time zone,
        CONSTRAINT maintanence_details_pkey PRIMARY KEY (id)
    )
    `;

    const createElevaDetails = `
    CREATE TABLE IF NOT EXISTS eleva_details
    (
        eleva_name character varying  NOT NULL,
        eleva_id integer NOT NULL,
        building_id integer NOT NULL,
        secretary_id text  NOT NULL,
        date date NOT NULL,
        music boolean,
        date_time boolean DEFAULT true,
        weather_details boolean,
        advertisement boolean,
        articles boolean,
        speed character varying  NOT NULL,
        vibration character varying  NOT NULL,
        temperature character varying  NOT NULL,
        oil_level character varying  NOT NULL,
        temperature_sensor character varying  NOT NULL,
        pressure_sensor character varying  NOT NULL,
        load_sensor character varying  NOT NULL,
        location double precision NOT NULL,
        current_floor integer NOT NULL,
        to_floor integer NOT NULL,
        current_weight integer NOT NULL,
        total_weight integer NOT NULL,
        door_open integer NOT NULL,
        emergency_contact integer NOT NULL,
        "time" time without time zone NOT NULL,
        CONSTRAINT eleva_details_pkey PRIMARY KEY (eleva_id)
    )`
        ;

    const createBuildingDetails = `CREATE TABLE IF NOT EXISTS building_details
    (
        building_id integer NOT NULL,
        building_name character varying NOT NULL,
        CONSTRAINT building_details_pkey PRIMARY KEY (building_id)
    );
    `
    pool.query(createEventsDetails)
        .then(() => pool.query(createBuildingDetails))
        .then(() => pool.query(createMaintanenceDetails))
        .then(() => pool.query(createOccupantsDetails))
        .then(() => pool.query(createSecretaryDetails))
        .then(() => pool.query(createElevaDetails))
        .then(() => console.log('Tables created successfully'))
        .catch(err => console.error(err))
        //.finally(() => pool.end());

}

module.exports = createTables;