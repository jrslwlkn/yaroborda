import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeLink({ name, url }) {
    return (
        <>
            <Link to={`/${url}`} className="link purple hover-white hover-bg-purple">{name}</Link>
            <br />
        </>
    );
}
