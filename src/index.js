const app = require('./app');
const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.send('Hello World!.The server is running')
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});