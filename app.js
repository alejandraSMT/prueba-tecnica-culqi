const express = require('express');
const app = express();
require('./db');
const bodyParser = require('body-parser');


const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/culqi',require("./routes/result_router.js"))

app.get('/',function(req,res){
  res.send("Hola mundo");
});

app.listen(port, function () {
  console.log(`Listening on port ${port}!`)
})
