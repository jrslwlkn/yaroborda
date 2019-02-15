import React from 'react';
import Md from 'react-markdown';

import Replies from './replies';
import ShowFullText from './ShowFullText';

export default function PostText({ text }) {
    return (
        <div className="v-top lh-little mv0 tl">
            <Md source={text} renderers={{ paragraph: 'span' }} />
            <ShowFullText />
            <Replies />
        </div>
    );
}
