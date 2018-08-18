const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const app = express();


// useMongoClient has depreciated. Only include { useMongoClient: true } only if your mongoose version is < 5.0.0
// DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.


mongoose.connect(config.database, { useNewUrlParser: true }, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to the database');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

/* app.get("/", (req, res, next) => {
    res.json({
        user: "Alice Rose"
    });
}); */

const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const sellerRoutes = require('./routes/seller');

app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/seller', sellerRoutes);

app.listen(config.port, err => {
  console.log('Magic happens on port awesome ' + config.port);
});
