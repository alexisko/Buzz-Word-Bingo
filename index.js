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

// get public folder to get index.html file
app.use(express.static('./public/'));

// just returns index.html file
app.get('/', (req, res) => {
  res.send('index.html');
});

// returns json obj of buzzwords
app.get('/buzzwords', (req, res) => {
  res.json(buzzWords);
});

// adds a new buzzword if it does not already exist
app.post('/buzzword', (req, res) => {
  var wordFound = false;
  for(var i = 0; i < buzzWords.buzzWords.length; i++) {
    if(buzzWords.buzzWords[i].buzzWord === req.body.buzzWord) {
      wordFound = true;
    }
  }
  if(wordFound) { //word was found don't push to buzzwords array
    res.json({ "success" : false });
  } else { // word was not found, create new buzzword to push to array
    buzzWords.buzzWords.push(req.body);
    res.json({ "success" : true });
  }
});

app.put('/buzzword', (req, res) => {
  var wordFound = false;
  for(var i = 0; i < buzzWords.buzzWords.length; i++) {
    if(buzzWords.buzzWords[i].buzzWord === req.body.buzzWord) {
      if(buzzWords.buzzWords[i].heard === "false") {
        newScore += parseInt(buzzWords.buzzWords[i].points);
        buzzWords.buzzWords[i].heard = true;
        wordFound = true;
      }
    }
  }
  if(wordFound) {
    res.json({ "success": true, "newScore": newScore });
  } else {
    res.json({ "success" : false });
  }
});

app.delete('/buzzword', (req, res) => {
  for(var i = 0; i < buzzWords.buzzWords.length; i++) {
    if(buzzWords.buzzWords[i].buzzWord === req.body.buzzWord) {
      buzzWords.buzzWords.splice(i, 1);
      res.json({ "success" : true });
    }
  }
  res.json({ "success" : false });
});

app.post('/reset', (req, res) => {
  buzzWords = { buzzWords: [] };
  newScore = 0;
  res.json({ "success" : true });
});

app.listen(8080);
