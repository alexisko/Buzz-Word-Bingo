/*jshint esversion: 6 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var buzzWords = { buzzWords: [] };
var newScore = 0;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded( {extended: true} ));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('./public/'));

app.get('/', (req, res) => {
  res.send('index.html');
});

app.get('/buzzwords', (req, res) => {
  res.send(buzzWords);
});

app.post('/buzzword', (req, res) => {
  var wordFound = false;
  for(var i = 0; i < buzzWords.buzzWords.length; i++) {
    if(buzzWords.buzzWords[i].buzzWord === req.body.buzzWord) {
      wordFound = true;
    }
  }
  if(wordFound) {
    res.send('{ "success" : false }');
  } else {
    buzzWords.buzzWords.push(req.body);
    res.send('{ "success" : true }');
  }
});

app.put('/buzzword', (req, res) => {
  var wordFound = false;
  for(var i = 0; i < buzzWords.buzzWords.length; i++) {
    if(buzzWords.buzzWords[i].buzzWord === req.body.buzzWord) {
      buzzWords.buzzWords[i].heard = req.body.heard;
      wordFound = true;
    }
    newScore += parseInt(buzzWords.buzzWords[i].points);
  }
  if(wordFound) {
    res.send(` { "success": true, "newScore": ${newScore} }`);
  } else {
    res.send('{ "success" : false }');
  }
});

app.delete('/buzzword', (req, res) => {
  for(var i = 0; i < buzzWords.buzzWords.length; i++) {
    if(buzzWords.buzzWords[i].buzzWord === req.body.buzzWord) {
      buzzWords.buzzWords.splice(i, 1);
      res.send('{ "success" : true }');
    }
  }
  res.send('{ "success" : false }');
});

app.post('/reset', (req, res) => {
  buzzWords = { buzzWords: [] };
  newScore = 0;
  res.send('{ "success" : true }');
});

app.listen(8080);
