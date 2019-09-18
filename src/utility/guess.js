const dictionary = require('./jsonDictionary5.json');

export const checkForDuplicateChars = (word) => {
    const wordArray = word.split('');
    return wordArray.some(function(v,i,a){
        return a.lastIndexOf(v)!=i;
    });
};

export const checkForValidGuess = (guess, guesses) => {
    //TODO: Turn these into options.
    const letterCount = 5;
    const allowDuplicates = false;
    if (guess.length != letterCount) {
        return "Your guess must be 5 letters long";
    } else if (!guess.match(/^[A-Za-z]+$/)) {
        return "Your guess can only contain letters";
    } else if (!allowDuplicates && checkForDuplicateChars(guess)) {
        return "Your guess has duplicate letters";
    } else if (!dictionary.hasOwnProperty(guess)) {
        return "Your guess is not a word";
    } else if (guesses.includes(guess)) {
        return "You've already guessed this word!";
    }
    return "";
}