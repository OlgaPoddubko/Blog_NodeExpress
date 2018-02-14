let ObjectID = require('mongodb').ObjectID;
const logger = require('../../utils/logger');
const fullUrl = require('../../utils/full_url');

module.exports = function(app, db) {

	app.get('/', function (req, res) {
	  res.render('index', { title: 'Hey', message: 'Hello there!' });
     logger.info(fullUrl(req));
	})

  app.post('/blogs', (req, res) => {
    const note = { text: req.body.body, title: req.body.title, author: req.body.author };
    db.collection('blogs').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
         logger.info(fullUrl(req));
      }
    });
  });

  app.get('/blogs', (req, res) => {
    
    db.collection('blogs').find().toArray((err, items) => {
    	if (err) {
        res.send({'error':'An error has occurred'});
      } else {
      	res.send(items);
        logger.info(fullUrl(req));
      } 
    });
  });

  app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('blogs').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
        logger.info(fullUrl(req));
      } 
    });
  });

  app.put ('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title, author: req.body.author };
    db.collection('blogs').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
          logger.info(fullUrl(req));
      } 
    });
  });

  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('blogs').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
        logger.info(fullUrl(req));
      } 
    });
  });

  app.all('*', function(req, res){
  //	res.send('what???', 404);
  	 res.render('index', { title: 'Hey', message: 'Hello there!' })
     logger.info(fullUrl(req));
  });

};
