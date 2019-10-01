import React from 'react';

export const GameInvitePlayer = () => {
    const copyText = () => {
        var getText = document.getElementById("linkForm");
        getText.select();
        getText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    };
    return (
        <div>
            <div className="input__instructions">Send this link to a friend to play with them!</div>
            <div className="input__box">
                <input
                    className="input__input input__copy"
                    onClick={copyText}
                    type="text"
                    value={window.location.href}
                    id="linkForm"
                    readOnly
                />            
                <button className="button input__button" onClick={copyText}>Copy</button>
            </div>
        </div>
    );
};

export default GameInvitePlayer;