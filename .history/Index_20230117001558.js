const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express =require('express');
const cors =require('cors');
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
       const Bookshoopingcollection = client.db("Booklance").collection("bookshooping");

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
      const query = {useremail:useremail}
      const book
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
