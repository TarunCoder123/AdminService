const {Client}=require('pg');
const dbconfig=require('../config/localconfig');
const { createAdminTable } = require('../models/adminModel');
const { createPropertyTable } = require('../models/propertryModel');

console.log(dbconfig,"dbconfig");

const client=new Client(dbconfig);

const connectDB=async ()=>{
    client.on('error',error=>{
        console.error('Unexpected PostgresSQL client error:',error);
        process.exit(1);
    });

    (async ()=>{
        try{
            await client.connect();
            // we can do the promise.all to save some time
            await createAdminTable(client);
            await createPropertyTable(client);
            console.log('Connect to postgres');
        } catch (e){
            console.error('Database connnection is failde');
            process.exit(1);
        }
    })();
};

module.exports={
    client,
    connectDB
};
