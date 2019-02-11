import React from 'react';
import Replies from './replies';
import ShowFullText from './ShowFullText';

export default function PostText({ text }) {
    return (
        <div className="v-top lh-little mv0 tl">
            {text}
            <ShowFullText />
            <Replies />
        </div>
    );
}
