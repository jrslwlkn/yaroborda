import React, { Component } from 'react';
import PostLayout from './PostLayout';
import PostText from '../post-text';
import PostTopInfo from '../post-top-info';
import PostImage from '../post-image';

class Post extends Component {
    render() {
        const { img, text, ...props } = this.props;
        return (
            <PostLayout>
                <PostTopInfo {...props} />
                {img && <PostImage img={img} />}
                <PostText text={text} />
            </PostLayout>
        );
    }
}

export default Post;
