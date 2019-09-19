const dictionary5 = require('./jsonDictionary5.json');
const dictionary5NoDups = require('./jsonDictionary5NoDups.json');

//TODO: move later
const encryptorKey = 'testtesttesttest';
export const encryptor = require('simple-encryptor')(encryptorKey);

export const npcSelectSecret = (difficulty = 0) => {
    let filteredDictionary = [];
    if (difficulty < 5) {
        for (let word in dictionary5NoDups) {
            if (dictionary5NoDups[word].difficulty <= difficulty) {
                filteredDictionary.push(word);
            }
        }
    }
    return filteredDictionary[Math.floor(Math.random() * Math.floor(filteredDictionary.length))];
};

export const compareGuessToSecret = (guess, secret) => {
    const decryptedSecret = encryptor.decrypt(secret);
    let matches = 0;
    if (guess === decryptedSecret) 
        return -1;
    guess.split('').forEach(letter => {
        if (decryptedSecret.includes(letter))
            matches++;
    });
    return matches;
};