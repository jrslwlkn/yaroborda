import React from 'react';
import PostTitle from './PostTitle';

export default function PostTopInfo({ title, sage, timestamp }) {
    return (
        <>
            <div className="mb2">
                {title && <PostTitle title={title} />}
                <span className="fr link purple hover-white hover-bg-purple b pointer">
                    reply
                </span>
                <small className="black-50 dib f6">{timestamp}</small>
                {sage && <span className="ma1 black f6 b ml4-ns bg-red">SAGE</span>}
                <span className="ma1 black link f6 b ml4-ns pointer">#435345834</span>
                <br />
            </div>
            <small className="black-50 dib f6">(746kb, 2310x2306)</small>
        </>
    );
}
