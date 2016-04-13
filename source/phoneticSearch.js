'use strict';

module.exports = phoneticSearch;

const regex = {
  nonAlfa: /[^a-z]/gi,
  discardableChars: /[aeihouwy]/gi,
  dupes: /(.)\1+/gi
};

const equivalentCharsGroups = [
  ['a', 'e', 'i', 'o', 'u'],
  ['c', 'g', 'j', 'k', 'q', 's', 'x', 'y', 'z'],
  ['b', 'f', 'p', 'v', 'w'],
  ['d', 't'],
  ['m', 'n']
];


function phoneticSearch(words, dictionary) {
  return words.reduce((results, word) => {
    const equivalents = matchEquivalentWords(word, dictionary);

    if (equivalents.length) {
      results.push({ word, equivalents });
    }

    return results;
  }, []);
}


function matchEquivalentWords(word, dictionary) {
  const cleanWord = wordCleaner(word);
  const phoneticRegex = createPhoneticRegex(cleanWord);

  if (! phoneticRegex) {
    return [];
  }

  return filterDictionary(phoneticRegex, dictionary);
}


function filterDictionary(phoneticRegex, dictionary) {
  return dictionary.filter((dictionaryWord) =>
    phoneticRegex.test(wordCleaner(dictionaryWord))
  );
}


function wordCleaner(word) {
  return removeDupes(discardChars(removeNonAlphaChars(word)));
}


function removeNonAlphaChars(word) {
  return word.replace(regex.nonAlfa, '');
}


function discardChars(word) {
  return word[0] + word.slice(1).replace(regex.discardableChars, '');
}


function removeDupes(word) {
  return word.replace(regex.dupes, '$1');
}


function createPhoneticRegex(word) {
  const placeholders = word.split('').map(findEquivalentCharGroups);
  return new RegExp(placeholders.join(''), 'i');
}


function findEquivalentCharGroups(char) {
  let equivalent = char;

  equivalentCharsGroups.some((charGroup) => {
    if (charGroup.indexOf(char) > -1) {
      equivalent = `[${charGroup.join('')}]`;
      return true;
    }
    return false;
  });

  return equivalent;
}
