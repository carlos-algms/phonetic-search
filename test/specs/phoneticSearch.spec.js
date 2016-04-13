'use strict';

describe('Phonetic search', () => {
  const phoneticSearch = require('../../source/phoneticSearch');

  const words = ['1ton#', 'brief', 'soon'];
  const dictionary = [
    'angel',
    'brave',
    'Braev',
    'Don',
    'Engel',
    'go',
    'goal',
    'son',
    'sunny',
    'Tom',
    'Tooonnnnyyyy'
  ];


  it('Return a list of matched words', () => {
    const results = phoneticSearch(words, dictionary);

    expect(results.length).toEqual(3);

    expect(results[0].word).toEqual('1ton#');
    expect(results[0].equivalents).toEqual(['Don', 'Tom', 'Tooonnnnyyyy']);

    expect(results[1].word).toEqual('brief');
    expect(results[1].equivalents).toEqual(['brave', 'Braev']);

    expect(results[2].word).toEqual('soon');
    expect(results[2].equivalents).toEqual(['son', 'sunny']);
  });


  it('Do not match any word', () => {
    const results = phoneticSearch(['word'], dictionary);

    expect(results.length).toEqual(0);
  });
});
