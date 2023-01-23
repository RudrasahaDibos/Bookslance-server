const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bancihe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      await client.connect();
      const UserProductCollection = client.db("warehouseManagment").collection("product");

      // console.log('Hello Dibos')

      app.get('/product', async(req, res)=>{
        const cursor = UserProductCollection.find({});
        const products = await cursor.toArray();

        res.send(products);
      })

      // find sing product api 
app.get('/product/:id',async(req,res)=>{
        const id = req.params.id;
        console.log(req.params);
        const query = {_id: ObjectId(id)};
        const result = await UserProductCollection.findOne(query);
        res.send(result);
    })

    //post
    app.post('/product',async(req,res)=>{
      const newservice = req.body;
      const result = await UserProductCollection.insertOne(newservice);
      res.send(result);
  })
   //delete
   app.delete('/product/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id:ObjectId(id)};
    const result = await UserProductCollection.deleteOne(query)
    res.send(result);
})
//Find Multiple Documents
app.get('/product',async(req,res)=>{
  console.log('query',req.query);
  const page = parseInt(req.query.page);
  const size =parseInt(req.query.size);
const query ={};
const cursor = UserProductCollection.find(query);
let product;
if(page || size){
  product = await cursor.skip(page*size).limit(size).toArray();
}
else{
  product = await cursor.toArray();

}

res.send(product);
});

// app.get('/productcount',async(req,res)=>{
//   const count = await UserProductCollection.estimatedDocumentCount();
//   res.send({count});
// })
     



    } finally {
      // await client.close();
    }
  }
  run().catch(console.dir);

app.get('/',(req ,res)=>{
    res.send("running my NODE ");
});
app.listen(port,()=>{
    console.log("curd server is running  ",port);
})
