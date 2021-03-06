import React from 'react';

export default function TopBigButton({ value, toggle }) {
    return (
        <div className="center w-50 mw4-ns">
            <button
                type="button"
                id="new-post"
                className="ba bg-white b--black pa2 mb2 mt3 db w-100 pointer"
                onClick={toggle}
            >
                {value}
            </button>
        </div>
    );
}
