import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeLink() {
    return (
        <>
            <Link to="/pr" className="link purple hover-white hover-bg-purple">Retro Games</Link>
            <br />
        </>
    );
}
