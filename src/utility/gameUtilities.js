const dictionary5 = require('./jsonDictionary5.json');
const dictionary5NoDups = require('./jsonDictionary5NoDups.json');

//TODO: move later
const encryptorKey = 'testtesttesttest';
export const encryptor = require('simple-encryptor')(encryptorKey);

export const getFilteredDictionary = (difficulty = 0) => {
    let filteredDictionary = [];
    if (difficulty < 5) {
        for (let word in dictionary5NoDups) {
            if (dictionary5NoDups[word].difficulty <= difficulty) {
                filteredDictionary.push(word);
            }
        }
    }
    return filteredDictionary;
};

export const npcSelectSecret = (difficulty = 0) => {
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

export const checkForValidGuess = (guess, guesses) => {
    //TODO: Turn these into options.
    const letterCount = 5;
    const allowDuplicates = false;
    if (guess.length != letterCount) {
        return "Your guess must be 5 letters long";
    } else if (!guess.match(/^[A-Za-z]+$/)) {
        return "Your guess can only contain letters";
    } else if (!allowDuplicates 
        && new Set(guess).size !== guess.length) {
        return "Your guess has duplicate letters";
    } else if (!dictionary5.hasOwnProperty(guess)) {
        return "Your guess is not a word";
    } else if (guesses.includes(guess)) {
        return "You've already guessed this word!";
    }
    return "";
}

export const checkForValidSecret = (guess) => {
    //TODO: Turn these into options.
    const letterCount = 5;
    const allowDuplicates = false;
    if (guess.length != letterCount) {
        return "Your guess must be 5 letters long";
    } else if (!guess.match(/^[A-Za-z]+$/)) {
        return "Your guess can only contain letters";
    } else if (!allowDuplicates 
        && new Set(guess).size !== guess.length) {
        return "Your guess has duplicate letters";
    } else if (!dictionary5.hasOwnProperty(guess)) {
        return "Your guess is not a word";
    } else if (guesses.includes(guess)) {
        return "You've already guessed this word!";
    }
    return "";
}