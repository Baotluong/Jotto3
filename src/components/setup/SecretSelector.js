import React from 'react';

export default class SecretSelector extends React.Component {
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
            <form
                onSubmit={this.onSubmit}
                className="form"
            >
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Select a Secret Word"
                    value={this.state.guess}
                    onChange={this.onGuessChange}
                />
                <button>Submit</button>
            </form>
        );
    }
};