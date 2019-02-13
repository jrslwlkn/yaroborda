import React from 'react';
import { Link } from 'react-router-dom';

export default function PostTitle({ title, link }) {
    return (
        <>
            <h3 className="dib ma0 mt1">
                <Link to={link} className="purple link">
                    {title}
                </Link>
            </h3>
            <br />
        </>
    );
}
