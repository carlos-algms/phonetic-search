'use strict';
const linereader = require('./source/linereader');
const phoneticSearch = require('./source/phoneticSearch');

const words = process.argv.slice(2);

linereader().then((dictionary) => {
  const results = phoneticSearch(words, dictionary);

  results.forEach((result) => {
    console.log(`${result.word}: ${result.equivalents.join(', ')}`);
  });
});
