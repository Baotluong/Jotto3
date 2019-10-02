import React from 'react';
import Popup from "reactjs-popup";

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
                <div className="letter-tracker__box">
                    <div className="letter-tracker__title-row">
                        <span>Letter Tracker</span>
                        <Popup
                            trigger={open => (
                                <button className="button"><span className="info-icon">&#x1F6C8;</span></button>
                            )}
                            position="right center"
                            closeOnDocumentClick
                            >
                            <div>
                                Click letters to change colors<br/>
                                <div className="popup-span maybe">Maybe</div>
                                <div className="popup-span definitely">Definitely</div>
                                <div className="popup-span definitely-not">Definitely Not</div>
                                Definitely letters appear below<br />
                                Click to shuffle them!
                            </div>
                        </Popup>
                    </div>
                    <div className="letter-tracker__letter-rows">
                        { this.state.lettersArray.map(letterData => {
                            return <button
                                    className={"button letter-tracker__button "
                                        + this.state.lettersArray.find(letter => letter.letter === letterData.letter).status }
                                    onClick={() => { this.changeAlphabetClass(letterData.letter) }}
                                    key={letterData.letter}
                                    >
                                        {letterData.letter}
                                    </button>
                        })}
                    </div>
                {
                    this.state.definitelyLettersArray.length > 0 && 
                    (<div className="letter-tracker__shuffle-row">
                        { this.state.definitelyLettersArray.map(letterData => {
                            return <button
                                className={"button letter-tracker__shuffle-button"}
                                key={letterData.letter}
                                onClick={this.handleShuffleLettersClick}
                            >
                                {letterData.letter}
                            </button> 
                        })}
                    </div>)
                }
                </div>
            </div>
        );
    }
}

export default LetterTracker;