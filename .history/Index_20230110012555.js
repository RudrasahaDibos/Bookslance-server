
const express =require('express');
const cors =require('cors');
require('dotenv').config();

const app =express();
const port = process.env.PORT||5000;
//use 
app.use(cors());
app.use(express.json());

//fs24cHKFxg0uMda3
//Rudra




app.get('/',(req ,res)=>{
    res.send("running my NODE ");
});
app.listen(port,()=>{
    console.log("curd server is running  ",port);
})
