import React, { Component } from 'react';
import OpLayout from './OpLayout';
import PostText from '../post-text';
import PostTopInfo from '../post-top-info';
import PostImage from '../post-image';

class OpPost extends Component {
    render() {
        const {
            img, size, text, ...props
        } = this.props;
        return (
            <OpLayout>
                <PostTopInfo {...props} />
                {img && <PostImage img={img} size={size} />}
                <PostText text={text} />
            </OpLayout>
        );
    }
}

export default OpPost;
