const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/api", routes);

app.use(function(err, req, res, next) {
    if (err.statusCode) {
        return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
});

app.listen(port);