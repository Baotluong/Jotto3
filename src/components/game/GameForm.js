import React from 'react';

export default class GameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: '',
            error: ''
        };
    }
    onGuessChange = (e) => {
        const guess = e.target.value;
        this.setState(() => ({
            guess
        }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        const guess = this.state.guess.toLowerCase();
        const error = this.props.onSubmit(guess);
        if (error) {
            this.setState(() => ({
                error
            }));
        } else {
            this.setState(() => ({
                guess:'',
                error:''
            }));
        }
    }
    getPlaceholder = () => {
        if (this.props.isNotMyTurn) {
            return "It's your opponent's turn!";
        } else if (this.props.isLoadingGuess) {
            return "Please wait. Saving your guess."
        } else {
            return "Enter word with 5 letters. See how many match.";
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p className="input__error">{this.state.error}</p>}
                <form
                    onSubmit={this.onSubmit}
                    className="input__box"
                >
                    <input
                        className="input__input"
                        type="text"
                        ref={input => input && input.focus()}
                        placeholder={this.getPlaceholder()}
                        value={this.state.guess}
                        onChange={this.onGuessChange}
                        disabled={this.props.isNotMyTurn || this.props.isLoadingGuess}
                    />
                    <button disabled={this.props.isNotMyTurn || this.props.isLoadingGuess} className="button input__button">
                        {this.props.isNotMyTurn || this.props.isLoadingGuess ? "Waiting..." : "Guess!"}
                    </button>
                </form>
            </div>          
        );
    }
}   