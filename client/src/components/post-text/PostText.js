import React from 'react';
import Md from 'react-markdown';

import Replies from './replies';
import ShowFullText from './ShowFullText';
import './post-text.css';

export default function PostText({ text }) {
    return (
        <div className="v-top lh-little mv0 tl post-text">
            <Md source={text} />
            <ShowFullText />
            <Replies />
        </div>
    );
}
