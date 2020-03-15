import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        let { text, replies } = this.props;
        const slicedText = text.slice(0, this.state.sliceEnd);
        text = text === slicedText ? text : `${slicedText}...`;

        window.revealPost = (id) => {
            this.displayPost(this.getPostById(id));
        };

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

    getPostById = (id) => {
        // filter from redux
        const { thread } = this.props;
        const { posts, opPost } = thread;
        if (opPost.id === id) return opPost;

        const thePost = posts.find(post => post.id === id);
        if (thePost) return thePost;
        return { text: '', img: '', replies: [] };
    }

    displayPost = (post) => {
        // instead of clg will be actual f that renders the post
        console.log(`text ${post.text}; replies ${post.replies}`);
    }


    render() {
        const { isRevealed, text, isShort } = this.state;
        const updatedMdText = text.replace(/(->([0-9]+))/gm, '[$1](javascript:revealPost($2))');

        // this.props.replies.op.push(12345)
        if (this.props.replies !== undefined) console.log('postText', this.props.replies);

        return (
            <div className="v-top lh-little mv0 tl post-text">
                <Md source={mdToHtml(updatedMdText)} escapeHtml={false} />
                { !isShort && <ShowFullText toggle={this.toggleFullText} revealed={isRevealed} />}
                {/* <Replies /> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    thread: state.thread
});

export default connect(mapStateToProps)(PostText);
