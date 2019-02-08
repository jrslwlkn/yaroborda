import React, { Component } from 'react';
import PostLayout from './PostLayout';
import PostText from '../post-text';
import PostTopInfo from '../post-top-info';
import PostImage from '../post-image';

class Thread extends Component {
  render() {
    return (
      <PostLayout>
        <PostTopInfo />
        {'image' && <PostImage />}
        <PostText />
      </PostLayout>
    );
  }
}

export default Thread;
