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
            <form
                onSubmit={this.onSubmitSecret}
                className="form"
            >
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Select a Secret Word"
                    value={this.state.secret}
                    onChange={this.onSecretChange}
                />
                <button>Submit</button>
            </form>
        );
    }
};