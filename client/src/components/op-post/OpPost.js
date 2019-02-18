import React, { Component } from 'react';
import OpLayout from './OpLayout';
import PostText from '../post-text';
import PostTopInfo from '../post-top-info';
import PostImage from '../post-image';

class OpPost extends Component {
    render() {
        const {
            img, size, img_width, img_height, text, ...props
        } = this.props;
        return (
            <OpLayout>
                <PostTopInfo {...props} />
                {img && <PostImage img={img} height={img_height} width={img_width} size={size} />}
                <PostText text={text} />
            </OpLayout>
        );
    }
}

export default OpPost;
