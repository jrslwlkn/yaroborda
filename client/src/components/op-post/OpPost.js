import React, { Component } from 'react';
import OpLayout from './OpLayout';
import PostText from '../post-text';
import PostTopInfo from '../post-top-info';
import PostImage from '../post-image';

class OpPost extends Component {
  render() {
    return (
      <OpLayout>
        <PostTopInfo />
        {'image' && <PostImage />}
        <PostText />
      </OpLayout>
    );
  }
}

export default OpPost;
