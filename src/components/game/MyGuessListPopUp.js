import React from 'react';
import Popup from "reactjs-popup";

const MyGuessListPopUp = () => (
    <Popup
        trigger={open => (
            <button className="button"><span className="info-icon">&#x1F6C8;</span></button>
        )}
        position="left center"
        closeOnDocumentClick
        >
            <div>
                The number next to the guess indicates how many letters the guess shares with the secret word. <br />
                Try to deduce which letters must and must not be in the secret word!
            </div>
    </Popup>
);

export default MyGuessListPopUp;
