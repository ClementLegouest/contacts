const { json } = require('express');
const Express = require('express');
const Mysql = require('mysql');

const config = require('./api_config');

const App = Express();
const PORT = 8081;

var connection = Mysql.createConnection({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db_name
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});

App.use(Express.json());

App.get('/', (req, res) => {
  res.send('Hello World');
});

App.get('/person', (req, res) => {

  const offset = req.param("offset") ? req.param("offset") : 0;
  const limit = req.param("limit") ? req.param("limit") : 10;
  const string_query = `SELECT firstname, lastname FROM person LIMIT ${limit} OFFSET ${offset};`;

  console.log(string_query);

  connection.query(string_query, function (err, result) {
    if (err) {
      res.status(500).json({"Error": err.message});
    } else {
      res.status(200).json({'Quantity': result.length, 'Results': result});
    }
  });
});

App.get('/person/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const srting_query = `SELECT firstname, lastname FROM person WHERE person_id = ${id}`;

  connection.query(
    srting_query,
    function (err, result) {
      if (err) {
        res.status(500).json({'error': err.message});
      } else {
        res.status(200).json({'Result': result});
      }
  });
});

App.post('/person', (req, res) => {
  const payload = req.body;
  const firstname = payload.firstname;
  const lastname = payload.lastname;
  const srting_query = `INSERT INTO person (firstname, lastname) VALUES ("${firstname}", "${lastname}");`

  connection.query(srting_query, function (err, result) {
    if (err) {
      res.status(500).json({'Message': err.message});
    } else {
      res.status(201).json({'Created': result});
    }
  });
});

App.listen(PORT, () => {
  console.log(`Hello World API listening at http://localhost:${PORT} !`);
});
