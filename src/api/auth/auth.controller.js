
const  authService=require('./auth.service');

const login=async(req,res)=>{
   const {email,password}=req.body;
   const admin=await authService.login(email,password);
   if(!admin){
    return res.status(401).json({message:'Invalid Credentials'});
   }

   const {accessToken,refreshToken}= authService.getToken(admin);

   res.cookie('accessToken',accessToken,{
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge:30*60*1000,
   });

   res.cookie('refreshToken',refreshToken,{
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge:7*24*60*60*1000,
   });
}

const register=async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const newAdmin=await  authService.register(name,email,password);
        res.status(201).json({message: 'Admin registered', admin: newAdmin});
    } catch(err){
        res.status(401).json({message:'Error registering admin',error:err.message});
    }
};

const refresh=async(req,res)=>{
   const token=req.cookies.refreshToken;
   if(!token){
    return res.status(401).json({message:"No refresh Token"});
   }

   try{
    const payload=authService.validateRefreshToken(token);
    const accessToken=authService.getToken(payload).accessToken;

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 30 * 60 * 1000,
      });
  
      res.json({ message: 'Token refreshed' });
   } catch {
      res.status(403).json({message:"Invalid refresh token"});
   }
}

const logout=(req,res)=>{
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
}

module.exports={register,login,refresh,logout};