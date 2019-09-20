const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const firebase = require('./firebase/firebase');
const database = firebase.database;
const bodyParser = require('body-parser');

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/game/:id', (req, res) => {
  database.ref(`${req.params.id}`).once('value')
    .then((snapshot) => {
      res.json(snapshot.val());
    }).catch((e) => {
      res.status(404).send({ error: 'Game not found' });
  });
});

app.post('/api/game/', (req, res) => {
  database.ref('games').push({
    test2: 'moo2'
  }).then((ref) => {
    res.status(201).json({ id: ref.key });
  }).catch((e) => {
    res.status(500).send({ error: 'Failed to create game' });
  });
});

app.put('/api/game/:id', (req, res) => {
  database.ref(`games/${req.params.id}/guesses`).push({
    guess: req.body.guess,
    matches: req.body.matches
  }).then((ref) => {
    res.status(201).json({ ref })
  }).catch((e) => {
    res.status(500).send({ error: 'Failed to add guess' });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});