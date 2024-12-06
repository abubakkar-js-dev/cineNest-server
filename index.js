const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());

app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y24v7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = 'mongodb://localhost:27017';

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
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const database = client.db('CineNestDb');
        const movieCollection = database.collection('movies');

        app.post('/add-movie',async(req,res)=>{
            const movie = req.body;
            console.log(movie);
            const result = await movieCollection.insertOne(movie);
            res.send(result);
        })

        app.get('/featured-movies',async(req,res)=>{
            const cursor = movieCollection.find().sort({rating: -1}).limit(6);
            const result = await cursor.toArray();

            res.send(result);
        })

        app.get('/all-movies',async(req,res)=>{
            const cursor = movieCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })





    } finally {
        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('The Server is working now.')
})

app.listen(port, () => {
    console.log(`started the server in port: ${port}`);
})
