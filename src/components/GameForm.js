import React from 'react';

export default class GameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: ''
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
        this.setState(() => ({
            guess: ''
        }));
        this.props.onSubmit(this.state.guess);
    }
    render() {
        return (
            <form
                onSubmit={this.onSubmit}
            >
                <input
                    type="text"
                    placeholder="Make a Guess!"
                    value={this.state.guess}
                    onChange={this.onGuessChange}
                />
                <button>Submit</button>
            </form>
        );
    }
}   