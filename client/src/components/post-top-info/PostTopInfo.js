import React from 'react';
import { Link } from 'react-router-dom';

import PostTitle from './PostTitle';

export default function PostTopInfo({
    title, sage, timestamp, link
}) {
    return (
        <div className="mb2">
            {title && <PostTitle title={title} />}
            <Link to={link} className="fr link purple hover-white hover-bg-purple b pointer">
                    reply
            </Link>
            <small className="black-50 dib f6">{timestamp}</small>
            {sage && <span className="ma1 black f6 b ml4-ns bg-red">SAGE</span>}
            <span className="ma1 black link f6 b ml4-ns pointer">#435345834</span>
            <br />
        </div>
    );
}
