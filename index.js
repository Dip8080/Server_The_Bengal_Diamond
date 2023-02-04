const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT||5000;
const app = express();


// middlewere

 app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('server is  running on 5000');

});


// checking 

app.listen(port,()=>{
    console.log('listening from server');
})

// mongodb connecting string

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rmqj6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// connecting to mongoServer

async function run(){
    await client.connect();
    console.log("da ta base co nn ected");
    const product_collection = client.db('bdl_ecom').collection('Product_collection');
  
    try{
        app.get('/products',async(req,res)=>{
            const query ={};
            const cursor=product_collection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
    
        app.get('/details/:id',async(req,res)=>{

            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const product = await product_collection.findOne(query);
            res.send(product);    
        })
      
        

    }
    catch{
        
    }

}

run().catch(console.dir);