'use strict'

const twitterCall = require('./twitterCall.js');

const express = require('express');
const bodyParser =require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/', async function(req, res){
  let response = await twitterCall(req.body.search)
  res.json(response);
});

app.get('/wakeUp/', function (req, res){
  res.send('RRRRRR')
})

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3005;
app.listen(port, function() {
 console.log(`app is running on port ${port}`);
});