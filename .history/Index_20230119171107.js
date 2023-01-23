const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express =require('express');
const cors =require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const app =express();
const port = process.env.PORT||5000;
 
app.use(cors());
app.use(express.json());

  function  VERIFYJWT  (req,res,next){
    const  autheaders = req.headers.authorization;
    if(!autheaders){
      return res.status(401).send({messaage: "UnAthorization Access"})
    }
    const token = autheaders.split(' ')[1];
    jwt.verify(token, process.env.JSON_WEB_TOKEN, function(err, decoded){
      if(err){
        return res.status(403).send({messaage : "Forbidaien Access"})
      }
      req.decoded = decoded;
      next()

    });

 }





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xciycim.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run(){
    try{
       await client.connect()
       const Bookcollection = client.db("Booklance").collection("bookproduct");
       const Bookshoopingcollection = client.db("Booklance").collection("bookshooping");
       const BookUserCollection = client.db("Booklance").collection("users");

       app.get('/bookproduct', async(req, res)=>{
     
         const page = parseInt(req.query.page);
         const size = parseInt(req.query.size);
        const query = {};
        const cursor = Bookcollection.find(query);
       let products;
      if(page || size){
         products = await cursor.skip(page*size).limit(size).toArray();
         }
       else{
           products = await cursor.toArray();
         }
        
        res.send(products);
      })
      app.put('/user/:email',async(req,res)=>{
        const email = req.params.email;
        const user = req.body;
        const filter = {email : email}
        const options = { upsert: true };
        const updateDoc = {
         $set:user,
       };
       const result = await BookUserCollection.updateOne(filter,updateDoc,options)
       const token = jwt.sign({email : email },process.env.JSON_WEB_TOKEN,{ expiresIn: '1h' })
        res.send({result,token})
   
     })


   app.get('/bookproductCount',async(req,res)=>{
         const count = await Bookcollection.estimatedDocumentCount();
         res.send({count})
   })

   app.post('/bookProductkeys',async(req,res)=>{
       const keys = req.body;
       const ids = keys.map(id =>ObjectId(id));
      const query = {_id: {$in:  ids}}
      const cursor = Bookcollection.find(query)
      const products = await cursor.toArray();
    
      res.send(products)
   })

   app.post('/bookbooking',async(req,res)=>{
       const bookbooking = req.body;
       const result = await Bookshoopingcollection.insertOne(bookbooking)
       res.send(result);
   })
   app.get('/bookbooking',async(req,res)=>{
      const useremail = req.query.useremail;
     const deco
      const query = {useremail: useremail}
      const bookbookings = await Bookshoopingcollection.find(query).toArray();
      res.send(bookbookings);
   })





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
