const express = require('express');
const shortener = require('./shortener');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/shorten', shortener.shorten);
app.get('/:id', shortener.redirect);

app.listen(port, () => {
    console.log(`URL shortener listening at http://localhost:${port}`);
});