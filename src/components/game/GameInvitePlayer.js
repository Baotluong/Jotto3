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
            <input type="text" value={window.location.href} id="linkForm" readOnly />            
            <button onClick={copyText}>Copy Link</button>
        </div>
    );
};

export default GameInvitePlayer;