const mongoose = require('mongoose');

const {
    DB_USER,
    DB_PASS,
    DB_NAME,
    PORT,
    MONGODB_URI
  } = process.env;

const options = {
    dbName: DB_NAME,
    user: DB_USER,
    pass: DB_PASS,
    useNewUrlParser: true
  };

mongoose.connect(
  MONGODB_URI, options).then( function() {
  console.log('MongoDB is connected');
})
  .catch( function(err) {
  console.log(err);
});

