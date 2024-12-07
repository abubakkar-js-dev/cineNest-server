const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());

app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y24v7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const database = client.db("CineNestDb");
    const movieCollection = database.collection("movies");
    const favoriteMovieCollection = database.collection("favorite-movies");

    app.post("/add-movie", async (req, res) => {
      const movie = req.body;
      const result = await movieCollection.insertOne(movie);
      res.send(result);
    });

    app.post("/add-favorite-movie", async (req, res) => {
      const favMovie = req.body;
      const result = await favoriteMovieCollection.insertOne(favMovie);
      res.send(result);
    });

    app.get("/featured-movies", async (req, res) => {
      const cursor = movieCollection.find().sort({ rating: -1 }).limit(6);
      const result = await cursor.toArray();

      res.send(result);
    });

    app.get("/all-movies", async (req, res) => {
      const {searchParams} = req.query;
      let filter = {};
      if(searchParams){
        filter = {title: {$regex: searchParams, $options: 'i'}};
      }
      const cursor = movieCollection.find(filter);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/favorite-movies", async (req, res) => {
      const cursor = favoriteMovieCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.delete("/favorite-movies/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const result = await favoriteMovieCollection.deleteOne(query);

      res.send(result);
    });

    // get single movie
    app.get("/all-movies/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await movieCollection.findOne(query);
      res.send(result);
    });

    app.patch("/all-movies/:id", async (req, res) => {
      const id = req.params.id;
      const movie = req.body;
      const filter = { _id: new ObjectId(id) };

      const updatedMovie = {
        $set: {
          poster: movie.poster,
          title: movie.title,
          genre: movie.genre,
          duration: movie.duration,
          releaseYear: movie.releaseYear,
          rating: movie.rating,
          summary: movie.summary,
        },
      };

      const result = await movieCollection.updateOne(filter,updatedMovie);
      res.send(result);
    });

    app.delete("/all-movies/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      const result = await movieCollection.deleteOne(filter);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The Server is working now.");
});

app.listen(port, () => {
  console.log(`started the server in port: ${port}`);
});
