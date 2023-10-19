const express = require('express')
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.CAR_USER}:${process.env.CAR_PASSWORD}@cluster0.nvdjbig.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("brandDB");
    const productCollections = database.collection("products");
    const mycartCollections = database.collection("mycartproducts");


    app.get('/Lamborghini', async(req, res)=>{
      const query = { brandName : "Lamborghini" };
      const result = await productCollections.find(query).toArray();
      res.send(result)
    })

    app.get('/BMD', async(req, res)=>{
      const query = { brandName : "BMD" };
      const result = await productCollections.find(query).toArray();
      res.send(result)
    })
    app.get('/Toyota', async(req, res)=>{
      const query = { brandName : "Toyota" };
      const result = await productCollections.find(query).toArray();
      res.send(result)
    })

    app.get('/AUDI', async(req, res)=>{
      const query = { brandName : "AUDI" };
      const result = await productCollections.find(query).toArray();
      res.send(result)
    })
    app.get('/Mercedes-Benz', async(req, res)=>{
      const query = { brandName : "Mercedes-Benz" };
      const result = await productCollections.find(query).toArray();
      res.send(result)
    })

    app.get('/Nissan', async(req, res)=>{
      const query = { brandName : "Nissan" };
      const result = await productCollections.find(query).toArray();
      res.send(result)
    })


    app.get('/details/:id', async(req, res)=>{
      const id = req.params.id
      const query = { _id : new ObjectId(id) };
      const result = await productCollections?.findOne(query);
      res.send(result)
    })

    app.get('/mycart/products', async(req, res)=>{
      const cursor = mycartCollections.find();
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/mycart', async(req, res)=>{
      const myCartProduct = req.body
      const result = await mycartCollections.insertOne(myCartProduct);
      res.send(result)
    })

    app.post('/allproducts', async(req, res)=>{
      const product = req.body
      const result = await productCollections.insertOne(product);
      res.send(result)
    })


    app.put('/details/:id', async(req, res)=>{
      const id = req.params.id
      const updatedProduct = req.body
      console.log(updatedProduct);
      const filter = {_id : new ObjectId(id)}
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name : updatedProduct.name,
          type : updatedProduct.type,
          price : updatedProduct.price,
          rating : updatedProduct.rating,
          photo : updatedProduct.photo,
          brandName : updatedProduct.brandName,
          description : updatedProduct.description,
        },
      };
      const result = await productCollections.updateOne(filter, updateDoc, options);
      res.send(result)
    })

    app.delete('/mycart/:id', async(req, res)=>{
      const id = req.params.id
      const query = { _id: new ObjectId(id) };
      const result = await mycartCollections.deleteOne(query);
      res.send(result)
    })




   
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hi! Rezwan..')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})