const client=require("../db/client");
const crypto=require('crypto');

async function createAdmin({name,email,passwordHash}){
    const res=await client.query(
        `INSERT INTO admin_details (name,email,password) VALUES ($1,$2,$3) RETURING id,name,email`,[name,email,passwordHash]);
        console.log(res,"res for createAdmin");
    
        return res.rows[0];
}

async function findAdminByEmail(email){
    const res=await client.query(
        `SELECT FROM admin_details WHERE email = $1`,[email]);
        console.log(res,"res for createAdmin");
    
        return res.rows[0];
}

module.exports={createAdmin,findAdminByEmail};