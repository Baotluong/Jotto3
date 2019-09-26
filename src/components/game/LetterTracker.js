import React from 'react';

export class LetterTracker extends React.Component {
    constructor(props) {
        super(props);
        const createLetterArray = () => {
            let array = [];
            for (let i = 65; i <= 90; i++) {
                array.push({
                    letter: String.fromCharCode(i),
                    status: this.letterStatusEnum.unknown
                });
            }
            return array;
        };
        this.state = {
            lettersArray: createLetterArray(),
            definitelyLettersArray: []
        }
    };
    letterStatusEnum = { unknown: 'unknown', maybe: 'maybe', definitely: 'definitely', definitelyNot: 'definitelyNot' };
    letterStatus = Object.values(this.letterStatusEnum);
    changeAlphabetClass = (letter) => {
        this.setState(() => ({
            lettersArray: this.state.lettersArray.map(letterData => {
                if (letterData.letter === letter)
                    letterData.status = this.letterStatus[(this.letterStatus.indexOf(letterData.status) + 1) % this.letterStatus.length];
                return letterData;
            }),
            definitelyLettersArray: this.state.lettersArray.filter(letterData => letterData.status === this.letterStatusEnum.definitely)
        }));
    }
    handleShuffleLettersClick = () => {
        let shuffledArray = this.state.definitelyLettersArray;
        for (var i = shuffledArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffledArray[i];
            shuffledArray[i] = shuffledArray[j];
            shuffledArray[j] = temp;
        }
        this.setState(() => ({
            definitelyLettersArray: shuffledArray
        }));
    }
    render () {
        return (
            <div>
                <h3>Letter Tracker</h3>
                <div>
                    { this.state.lettersArray.slice(0, 13).map(letterData => {
                        return <button
                                className={ this.state.lettersArray.find(letter => letter.letter === letterData.letter).status }
                                onClick={() => { this.changeAlphabetClass(letterData.letter) }}
                                key={letterData.letter}
                                >
                                    {letterData.letter}
                                </button>
                    })}
                </div>
                <div>
                    { this.state.lettersArray.slice(13, 26).map(letterData => {
                        return <button
                                className={ this.state.lettersArray.find(letter => letter.letter === letterData.letter).status }
                                onClick={() => { this.changeAlphabetClass(letterData.letter) }}
                                key={letterData.letter}
                                >
                                    {letterData.letter}
                                </button>
                        
                    })}
                </div>
                {
                    this.state.definitelyLettersArray.length > 0 && 
                    (<div>
                        { this.state.definitelyLettersArray.map(letterData => {
                            return <button
                                key={letterData.letter}
                                onClick={this.handleShuffleLettersClick}
                            >
                                {letterData.letter}
                            </button> 
                        })}
                    </div>)
                }
            </div>
        );
    }
}

export default LetterTracker;