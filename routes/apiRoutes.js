const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../db/store');
const uniqid = require('uniqid');

console.log(uniqid()); // -> 4n5pxq24kpiob12og9


notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
        title,
        text,
        id: uniqid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`New note added!`);
  } else {
    res.error('Error when adding new note');
  }
});

module.exports = notes;


