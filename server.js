const _ = require('lodash');
require('rootpath')();
var port = 4000;
const express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const morgan = require('morgan');
const mongoose = require('mongoose');
const db = mongoose.connection;
const config = require('./config.json');
const userRoutes = require('./routes/users.routes');
const fetchRecentUsers = require('./services/fetchRecentUsers');
app.use(cors());
app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(morgan('dev'));
mongoose.set('useCreateIndex', true);
mongoose.connect(config.connectionString , { useNewUrlParser: true, useUnifiedTopology: true,maxIdleTimeMS: 5000 } ); 

db.on('error' , console.error.bind(console , 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});


app.use('/api', userRoutes);
var freeRoutes = []
    app.use('/' , require('./routes/users.routes')); 
    freeRoutes = [ '/users/authenticate', '/users/register','/admin/create_admin']


app.use(expressJwt({
    secret: config.secret, getToken: function (req) {
        if (req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer') { return req.headers.authorization.split(' ')[1]; }
        else if (req.query && req.query.token) { return req.query.token; } return null;
    }
}).unless({
    path: freeRoutes
}));


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Token');
    } else {
        throw err;
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    fetchRecentUsers()
      .then((users) => {
        console.log('Users registered in the last 7 days:', users);
      })
      .catch((error) => {
        console.error('Error fetching recent users:', error);
      });
  });
  
  module.exports = app;

