const { MongoClient, ServerApiVersion } = require('mongodb'
const express =require('express');
const cors =require('cors');
require('dotenv').config();

const app =express();
const port = process.env.PORT||5000;
 
app.use(cors());
app.use(express.json());



);
const uri = "mongodb+srv://Booklances:<password>@cluster0.xciycim.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



app.get('/',(req ,res)=>{
    res.send("Book Bikrikora hoy aikane ");
});
app.listen(port,()=>{
    console.log("curd server is running  ",port);
})
