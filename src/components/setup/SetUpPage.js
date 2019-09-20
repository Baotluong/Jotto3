import React from 'react';
import { connect } from 'react-redux';
import SetUpSettings from './SetUpSettings';

export class SetUpPage extends React.Component {
    constructor (props) {
       super(props); 
    }
    onSubmit (secret) {
        //generate new game and link
    }
    render () {
        return (
            <div>
                <h3>SetUpPage</h3>
                <SetUpSettings />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    // onSubmit = dispatch()
});

export default connect(undefined, mapDispatchToProps)(SetUpPage);