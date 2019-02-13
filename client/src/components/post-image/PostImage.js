import React from 'react';

export default function PostImage({
    img, size, height, width
}) {
    img = 'http://placekitten.com/600/1000';

    return (
        <>
            <small className="black-50 dib f6">({size || '1.2MB'}, {width || 600}px * {height || 1000}px)</small>
            <div className="v-top">
                <a target="_blank" rel="noopener noreferrer" href={img}>
                    <img src={img} alt="" className="w-100 mw5-ns fl-ns pr3-ns pa0 pb1 mt1" />
                </a>
            </div>
        </>
    );
}
