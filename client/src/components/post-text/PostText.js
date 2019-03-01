import React, { Component } from 'react';

// to be removed
import ShowMoreText from 'react-show-more-text';
import Md from 'react-markdown/with-html';
import mdToHtml from 'marked';

import Replies from './replies';
import ShowFullText from './ShowFullText';
import './post-text.css';

class PostText extends Component {
    state = {
        isRevealed: false,
        isShort: true,
        text: ''
    }

    componentDidMount = () => {
        const { text } = this.props;

        // to be changed
        if (text.length > 100) {
            this.setState({ isShort: false });
        }
    }

    toggleFullText = () => {
        this.setState(state => ({ isRevealed: !state.isRevealed }));
    }


    otherFunc = () => console.log('other f');

    someFunc = () => {
        window.someFunc = (id) => {
            this.otherFunc();
            console.log(id);
        };
    }

    render() {
        const { text } = this.props;
        const updatedMdText = text.replace(/(->([0-9]+))/gm, '[$1](javascript:someFunc($2))');

        return (
            <div className="v-top lh-little mv0 tl post-text">
                <ShowMoreText
                    lines={8}
                    more="Show full post"
                    less="Collapse it"
                >
                    <Md source={mdToHtml(updatedMdText)} escapeHtml={false} />
                </ShowMoreText>
                {/* <ShowFullText />
            <Replies /> */}
            </div>
        );
    }
}

export default PostText;
