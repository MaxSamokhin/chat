import express from 'express';


const app = express();


app.use('/login', express.static('static'));
app.use('/chat', express.static('static'));
app.get('/', (req, res) => {
    res.redirect('/login');
});


const port = process.env.PORT || 8001;


app.listen(port, () => {
    console.log(`App start on port ${port}`);
});

