const dictionary = require('./jsonDictionary5.json');

//TODO: move later
const encryptorKey = 'testtesttesttest';
export const encryptor = require('simple-encryptor')(encryptorKey);

export const npcSelectSecret = (difficulty = 0) => {
    let filteredDictionary = [];
    if (difficulty < 5) {
        for (let word in dictionary) {
            if (dictionary[word].difficulty <= difficulty) {
                filteredDictionary.push(word);
            }
        }
    }
    return filteredDictionary[Math.floor(Math.random() * Math.floor(filteredDictionary.length))];
};

export const startSinglePlayer = () => {

};