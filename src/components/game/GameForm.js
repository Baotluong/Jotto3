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
                    placeholder={this.props.isDisabled 
                        ? "It's your opponent's turn!"
                        : "Enter word with 5 letters. See how many match."}
                    value={this.state.guess}
                    onChange={this.onGuessChange}
                    disabled={this.props.isDisabled}
                />
                <button disabled={this.props.isDisabled} className="button input__button">
                    {this.props.isDisabled ? "Waiting..." : "Guess!"}
                </button>
            </form>
            </div>          
        );
    }
}   