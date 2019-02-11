import React from 'react';

export default function PostTitle({ title }) {
    return (
        <>
            <h3 className="dib ma0 mt1">
                <a href="http://thread" className="purple link">
                    {title}
                </a>
            </h3>
            <br />
        </>
    );
}
