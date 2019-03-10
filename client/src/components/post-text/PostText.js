import React, { Component } from 'react';

import Md from 'react-markdown/with-html';
import mdToHtml from 'marked';

import Replies from './replies';
import ShowFullText from './ShowFullText';
import './post-text.css';

class PostText extends Component {
    state = {
        isRevealed: false,
        isShort: true,
        text: '',
        sliceEnd: 1250
    }

    componentDidMount = () => {
        let { text } = this.props;
        const slicedText = text.slice(0, this.state.sliceEnd);
        text = text === slicedText ? text : `${slicedText}...`;

        this.setState({
            isShort: text === slicedText,
            text
        });
    }

    toggleFullText = () => {
        let { text } = this.props;
        this.setState(state => {
            if (state.isRevealed) {
                text = text.slice(0, this.state.sliceEnd);
            }
            return {
                isRevealed: !state.isRevealed,
                text
            };
        });
    }


    otherFunc = () => console.log('other f');

    someFunc = () => {
        window.someFunc = (id) => {
            this.otherFunc();
            console.log(id);
        };
    }

    render() {
        const { isRevealed, text, isShort } = this.state;
        const updatedMdText = text.replace(/(->([0-9]+))/gm, '[$1](javascript:someFunc($2))');

        return (
            <div className="v-top lh-little mv0 tl post-text">
                <Md source={mdToHtml(updatedMdText)} escapeHtml={false} />
                { !isShort && <ShowFullText toggle={this.toggleFullText} revealed={isRevealed} />}
                {/* <Replies /> */}
            </div>
        );
    }
}

export default PostText;
