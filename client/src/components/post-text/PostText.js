import React from 'react';
import MD from 'react-markdown';

import Replies from './replies';
import ShowFullText from './ShowFullText';

export default function PostText({ text }) {
    return (
        <div className="v-top lh-little mv0 tl">
            <MD source={text} />
            <ShowFullText />
            <Replies />
        </div>
    );
}
