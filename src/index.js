require('dotenv').config();
const app = require('./app');
const connectMongodb = require('./config/db');
const port = process.env.PORT || 5000;


// connect mongodb
connectMongodb(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Failed to connect Mongodb. ERROR: ",err);
})

app.get('/', (req, res) => {
    res.send('Hello World!.The server is running')
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});