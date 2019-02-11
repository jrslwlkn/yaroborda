import React from 'react';

export default function PostImage({ img }) {
    return (
        <div className="v-top">
            <a target="_blank" rel="noopener noreferrer" href={img}>
                <img
                    src={img}
                    className="w-100 mw5-ns fl-ns pr3-ns pa0 pb1 mt1"
                    alt=""
                />
            </a>
        </div>
    );
}
