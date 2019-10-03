import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const winTitle = "Congratulations!";
const lossTitle = "Awww...So close!";

const WinModal = (props) => (
    <Modal
        isOpen={(!!props.showWinModal || !!props.showLossModal)}
        contentLabel="WinModal"
        onRequestClose={props.handleClearShowModal}
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title"> {props.showWinModal ? "Congratulations!" : "Awww...So close!"} </h3>
        {props.showWinModal ? 
            (<p className="modal__body">
                Your opponent's secret was {props.oppSecret}!<br/>
                It only took you {props.numberOfTries} {props.numberOfTries != 1 ? 'guesses' : 'guess'} to figure it out!
            </p>)
            : 
            (<p className="modal__body">
                Your opponent's secret was {props.oppSecret}!<br/>
                They figured out your secret in {props.numberOfTries} {props.numberOfTries != 1 ? 'tries' : 'try'}!!
            </p>)
        }
        <div className="modal__button-row">
            <Link to="/">
            <button className="button modal__button--home">
                    GO HOME
                </button>
            </Link>
            <button 
                onClick={props.handleClearShowModal}
                className="button modal__button--stay"
            >
                STAY HERE
            </button>
        </div>
    </Modal>
);

export default WinModal;