import React from 'react';

export default function ShowFullText({ toggle, revealed }) {
    return (
        <div onClick={toggle} className="center w-100 tc pointer purple hover-white hover-bg-purple dib mv2">
            {revealed ? 'Collapse it!' : 'Show full post...'}
        </div>
    );
}
