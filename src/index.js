const express=require('express');
const {client,connectDB}=require("../src/db/client");
const cookieParser = require('cookie-parser');
const authenticate = require('./api/auth/auth.middleware');
const authRoutes=require("./api/auth/auth.routes");
const propertyRoutes=require("./api/property/property.route");
const routes = require('./api/route');

const app=express();
app.use(express.json());
app.use(cookieParser());

connectDB();

// app.use('/auth',authRoutes);
app.use('api/v1',routes)
// app.use('/api/properties',propertyRoutes);

app.get('/',authenticate,async(req,res)=>{
    try{
        const result=await client.query('SELECT NOW()');
        console.log(result,"Result");
        res.send(`Connected via Client,Time: ${result.rows[0].now}`);
    }catch(error){
        res.send('Database error',error);
    }
})

app.listen(3000,()=>{
    console.log('application is running on 3000');
});