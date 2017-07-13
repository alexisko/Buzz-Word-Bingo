/*jshint esversion: 6 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const buzzword = require('./routes/buzzwords.js');
// app.use('/', buzzword);

app.use(express.static('./public/'));

app.get('/', (req, res) => {
  console.log('test');
  res.send('index.html');
});

app.get('/buzzwords', (req, res) => {

});

app.route('/buzzword')
  .post((req, res) => {

  })
  .put((req, res) => {

  })
  .delete((req, res) => {

  });

app.post('/reset', (req, res) => {

});

const server = app.listen(8080);
