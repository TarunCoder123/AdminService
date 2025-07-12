const bcrypt=require('bcrypt');
const { createAdmin, findAdminByEmail } = require('../../helper/adminHelper');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('./jwtUtils');
const { verify } = require('jsonwebtoken');

async function register(name,email,password){
    const hashPassword=await bcrypt.hash(password,10);
    return await createAdmin({name,email,hashPassword});
};

async function login(email,password){
   const admin=await findAdminByEmail(email);
   if(!admin)return null;
   const match=await bcrypt.compare(password,admin.password);
   return match?admin:null;
}

const getToken=(admin)=>{
    const payload={id: admin.admin_id,email:admin.email};
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload)
    }
}

const validateRefresh=(token)=>{
    return verifyRefreshToken(token);
}

module.exports={register,getToken,login,validateRefresh};