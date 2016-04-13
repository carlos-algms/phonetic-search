'use strict';
const readline = require('readline');

module.exports = lineReader;


function lineReader() {
  return new Promise(readLines);
}


function readLines(resolve) {
  const rl = _createLineReader();
  const dictionary = [];

  rl.on('line', word => dictionary.push(word));
  rl.on('close', () => resolve(dictionary));
}


function _createLineReader() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
}
