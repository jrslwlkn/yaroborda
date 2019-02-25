import React from 'react';
import Md from 'react-markdown/with-html';
import mdToHtml from 'marked';

import Replies from './replies';
import ShowFullText from './ShowFullText';
import './post-text.css';

export default function PostText({ text }) {
    const otherFunc = () => console.log('other f');

    window.someFunc = (id) => {
        otherFunc();
        console.log(id);
    };

    const updatedMdText = text.replace(/(->([0-9]+))/gm, '[$1](javascript:someFunc($2))');

    return (
        <div className="v-top lh-little mv0 tl post-text">
            <Md source={mdToHtml(updatedMdText)} escapeHtml={false} />
            <ShowFullText />
            <Replies />
        </div>
    );
}
