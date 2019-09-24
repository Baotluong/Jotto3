const dictionary5 = require('./jsonDictionary5.json');
const dictionary5NoDups = require('./jsonDictionary5NoDups.json');

//TODO: move later
const encryptorKey = 'testtesttesttest';
export const encryptor = require('simple-encryptor')(encryptorKey);

export const getFilteredDictionary = (difficulty = 5, allowDuplicates = false) => {
    let filteredDictionary = [];
    if (difficulty <= 5) {
        for (let word in dictionary5NoDups) {
            if (dictionary5NoDups[word].difficulty <= difficulty) {
                filteredDictionary.push(word);
            }
        }
    }
    return filteredDictionary;
};

export const npcSelectSecret = (difficulty = 5) => {
    const filteredDictionary = getFilteredDictionary(difficulty);
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

export const checkForValidGuess = (guess, alreadyGuessed = [], difficulty = 5, allowDuplicates = false, letterCount = 5) => {
    if (guess.length != letterCount) {
        return "Your guess must be 5 letters long";
    } else if (!guess.match(/^[A-Za-z]+$/)) {
        return "Your guess can only contain letters";
    } else if (!allowDuplicates 
        && new Set(guess).size !== guess.length) {
        return "Your guess has duplicate letters";
    } else if (!dictionary5.hasOwnProperty(guess)) {
        return "Your guess is not a word";
    }
    // TODO: alreadyguess holds obj. Cant use includes, but also will need to handle modolo. Letting you guess dupes for now.
    // else if (alreadyGuessed.length > 0 && alreadyGuessed.includes(guess)) {
    //     return "You've already guessed this word!";
    // }
    return "";
}

export const checkForValidSecret = (secret, difficulty = 5, allowDuplicates = false, letterCount = 5) => {
    if (secret.length != letterCount) {
        return "Your secret must be 5 letters long";
    } else if (!secret.match(/^[A-Za-z]+$/)) {
        return "Your secret can only contain letters";
    } else if (!allowDuplicates 
        && new Set(secret).size !== secret.length) {
        return "Your secret has duplicate letters";
    } else if (!getFilteredDictionary(difficulty).hasOwnProperty(secret)) {
        return "Your secret is not a word";
    }
    return "";
}