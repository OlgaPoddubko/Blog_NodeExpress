let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

	app.get('/', function (req, res) {
	  res.render('index', { title: 'Hey', message: 'Hello there!' })
	})

  app.post('/blogs', (req, res) => {
    const note = { text: req.body.body, title: req.body.title, author: req.body.author };
    db.collection('blogs').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
      	console.log(result.ops[0]); //
        res.send(result.ops[0]);
      }
    });
  });

  app.get('/blogs', (req, res) => {
    
    db.collection('blogs').find().toArray((err, items) => {
    	if (err) {
        res.send({'error':'An error has occurred'});
      } else {
      	console.log(items); //
        res.send(items);
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
      	console.log(item); //
        res.send(item);
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
      	console.log('Note ' + id + ' deleted!'); //
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

  app.all('*', function(req, res){
  	res.send('what???', 404);
  	// res.render('index', { title: 'Hey', message: 'Hello there!' })
  });

};
