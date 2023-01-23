const { MongoClient, ServerApiVersion } = require('mongodb');
const express =require('express');
const cors =require('cors');
const { query } = require('express');
require('dotenv').config();

const app =express();
const port = process.env.PORT||5000;
 
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xciycim.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run(){
    try{
       await client.connect()
       const Bookcollection = client.db("Booklance").collection("bookproduct");

       app.get('/bookproduct', async(req, res)=>{
        const cursor = Bookcollection.find({});
        const products = await cursor.toArray();
        res.send(products);
      })
   app.get('/bookproductCount',async(req,res))


    }
    finally{

    }
 }
 run().catch(console.dir);


app.get('/',(req ,res)=>{
    res.send("Book Bikrikora hoy aikane ");
});
app.listen(port,()=>{
    console.log("curd server is running  ",port);
})
