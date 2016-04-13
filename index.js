'use strict';
const stdInputReader = require('./source/stdInputReader');
const phoneticSearch = require('./source/phoneticSearch');

const words = process.argv.slice(2);

stdInputReader().then((dictionary) => {
  const results = phoneticSearch(words, dictionary);

  results.forEach((result) => {
    console.log(`${result.word}: ${result.equivalents.join(', ')}`);
  });
});
