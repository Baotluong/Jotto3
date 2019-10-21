import React from 'react';

export default class SecretSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secret: '',
            error: ''
        };
    }
    onSecretChange = (e) => {
        const secret = e.target.value;
        this.setState(() => ({
            secret
        }));
    }
    onSubmitSecret = (e) => {
        e.preventDefault();
        const secret = this.state.secret.toLowerCase();
        const error = this.props.onSubmitSecret(secret);
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
                <div className="input__instructions">Submit your 5-letter secret word. It cannot contain duplicates.</div>
                {this.state.error && <div className="input__error">{this.state.error}</div>}
                <form
                    onSubmit={this.onSubmitSecret}
                    className="input__box"
                >       
                    <input
                        className="input__input"
                        type="text"
                        placeholder="Keep it fun! Don't pick something too hard!"
                        value={this.state.secret}
                        onChange={this.onSecretChange}
                    />
                    <button className="button input__button">Submit</button>
                </form>
            </div>
        );
    }
};