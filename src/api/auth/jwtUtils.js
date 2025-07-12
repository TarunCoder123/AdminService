const jwt=require('jsonwebtoken');
const dbConfig=require("../../config/localconfig");

const generateAccessToken=(payload)=>{
    jwt.sign(payload,dbConfig.accessTokenSecret,{expiresIn:dbConfig.accessTokenExpiry});
};

const generateRefreshToken=(payload)=>{
    jwt.sign(payload,dbConfig.refreshTokenSecret,{expiresIn:dbConfig.refreshTokenExpiry});
};

const verifyAccessToken=(token)=>{
    jwt.verify(token,dbConfig.accessTokenSecret);
}


const verifyRefreshToken=(token)=>{
    jwt.verify(token,dbConfig.refreshTokenSecret);
}

module.exports={
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}