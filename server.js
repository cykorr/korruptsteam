const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.use('/', router);


function keepAlive(){

   app.listen(3000, ()=>{console.log("Server is online!")});

}

module.exports = keepAlive;
