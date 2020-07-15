'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const func = require('./handlers/clientHandlers');
const hangman = require('./handlers/hangmanHandlers');

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get('/clients', func.handleClients)
  .get('/:id', func.handleId)
  .post('/newclient', func.handleNewClient)
  .delete('/removeclient/:id', func.handleRemoveClient)

  .get('/hangman/word', hangman.handlerWord)
  .get('/hangman/guess/:id/:letter', hangman.handlerLetter)
  .listen(8000, () => console.log(`Listening on port 8000`));
