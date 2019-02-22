import React from 'react';

export default function ThreadLayout({ children, id }) {
    return (
        <div className="w-100 mw7-ns center" id={id}>
            <div className="fr w-90 bg-white tj pv1 shadow-1 pa2 mb2">
                {children}
            </div>
        </div>
    );
}
