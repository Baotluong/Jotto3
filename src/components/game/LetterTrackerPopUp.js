import React from 'react';
import Popup from "reactjs-popup";

const LetterTrackerPopUp = () => (
    <Popup
        trigger={open => (
            <button className="button"><span className="info-icon">&#x1F6C8;</span></button>
        )}
        position="left center"
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
);

export default LetterTrackerPopUp;
