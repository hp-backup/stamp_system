const express = require('express');
const bodyParser = require('body-parser');
const server = express();

const auth = require('./controllers/Auth');
const port = process.env.PORT || 3000

server.use([bodyParser.json(), bodyParser.urlencoded({ extended: true })]);

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

server.use('/auth', auth);

server.get('/', function (req, res) {
    return res.send('Hello World! welcome to my site')
});
