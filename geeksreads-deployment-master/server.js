// IMportant requires 
const config = require('config')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');

require('./models/resources.model');
// the routes used till now
const Users = require('./routes/Users');
const Authors = require('./routes/Authors');
const Auth = require('./routes/Auth');
const Statuses = require('./routes/Statuses');
const Comments = require("./routes/commentsController");
const Review = require("./routes/reviewsController");
const Resources= require("./routes/Resources");
const Books = require("./routes/Books");
const OwnedBooks= require("./routes/ownedBooks");
const Search = require("./routes/Search");
const app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};


app.use(allowCrossDomain);
app.use(express.static('static'));
  //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));



//Haitham -- cause error please check it 
/* if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
} */

// connecting to the database
const MONGO_URI = process.env.NODE_ENV === 'production' 
                      ? 'mongodb+srv://admin:admin@geeksreads-kjyxb.gcp.mongodb.net/test?retryWrites=true' 
                      : 'mongodb://localhost:27017/GreekReaders';

mongoose.connect('mongodb+srv://admin:admin@geeksreads-kjyxb.gcp.mongodb.net/geeksreaders?retryWrites=true',{ useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error(err));

app.use(express.json());

// 
app.use('/api/users', Users);
app.use('/api/authors', Authors);
app.use('/api/auth', Auth);
app.use('/api/user_status', Statuses);
app.use('/api/comments', Comments); 
app.use('/api/reviews', Review);
app.use('/api/resources', Resources);
app.use('/api/books', Books);
app.use('/api/owned_books', OwnedBooks);
app.use('/api/search', Search);



app.use((req, res, next) => {
  console.log("caught this path and redirected to index", req.path);
  res.sendFile(__dirname + '/static/index.html');
});


// the port where the application run
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// importannt Exports
module.exports.app= app;
