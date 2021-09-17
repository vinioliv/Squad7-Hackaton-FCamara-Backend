import {createConnection} from "typeorm";

require('dotenv').config();

console.log(process.env.DB_HOST)

createConnection({
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": 3306,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "bd_ProjetoFCamara",
    "entities": ["src/entities/*.ts"],
    "logging": true,
    "synchronize": true,
    "migrations": ["src/database/migrations/*.ts"],
    "cli":{
        "entitiesDir": "src/entities",
        "migrationsDir": "src/database/migrations"
    }
})