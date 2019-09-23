const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dbAgent = require('./database/dbAgent');

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/game/:id', (req, res) => {
  dbAgent.getGameByID(req.params.id)
    .then((result) => {
      res.json(result);
    }).catch((e) => {
      res.status(404).send(e.message);
  });
});

app.post('/api/game', (req, res) => {
  dbAgent.createGame(req.body)
  .then((newGame) => {
    res.json(newGame);
  }).catch((e) => {
    res.status(500).send(e.toString());
  });
});

app.put('/api/game/:id', (req, res) => {
  dbAgent.updateGameByID(req.params.id, req.body)
    .then((ref) => {
      res.json(ref);
    }).catch((e) => {
      res.status(500).send(e.toString());
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});