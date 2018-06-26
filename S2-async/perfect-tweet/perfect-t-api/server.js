'use strict'

const express = require('express');
const bodyParser =require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
	res.send('YO');
});

app.get('/test', (req, res)=>{

	res.json({text:'this text'});

})

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3005;
app.listen(port, function() {
 console.log(`app is running on port ${port}`);
});

console.log('this is just a test')
