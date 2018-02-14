const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;
const path = require('path');
//const logger = require('./utils/logger');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true} ));

/* always (any route, any request) return JSON of fixed blog article object 

app.all('*', function(req, res){
  let blog = require('./blog');
  console.log(blog);
  res.send(blog);
  logger.info(req.headers.host);
});

*/

MongoClient.connect(db.url, (err, client) => {
	if (err) return console.log(err)
	require('./app/routes')(app, client.db('blogsdb'));
	app.listen(port, () => {
	  console.log('We are live on ' + port);
	});
})
