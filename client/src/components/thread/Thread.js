import React, { Component } from 'react';
import OpPost from '../op-post';
import Post from '../post';
import TopBigButton from '../top-big-button';
import CreatePost from '../create-post';

class Thread extends Component {
    state = {
        showForm: true
    }

    render() {
        const { showForm } = this.state;

        return (
            <>
                {!showForm && <TopBigButton />}

                {showForm && <CreatePost />}

                <OpPost />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </>
        );
    }
}

export default Thread;
