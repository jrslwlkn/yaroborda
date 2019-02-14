import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import PostTitle from './PostTitle';

export default function PostTopInfo({
    title, sage, timestamp, link, id, func
}) {
    return (
        <div className="mb2">
            {title && <PostTitle title={title} link={link} />}
            <Link to={link} onClick={func} className="fr link purple hover-white hover-bg-purple b pointer">
                reply
            </Link>
            <small className="black-50 dib f6">{new Date(timestamp).toLocaleString()}</small>
            {sage && <span className="ma1 black f6 b ml4-ns bg-red">SAGE</span>}
            <span id={id} className="ma1 black link f6 b ml4-ns pointer">#{id}</span>
            <br />
        </div>
    );
}
