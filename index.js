'use strict';
const linereader = require('./source/linereader');
const phoneticSearch = require('./source/phoneticSearch');

const words = process.argv.slice(2);

linereader().then((dictionary) => phoneticSearch(words, dictionary));
