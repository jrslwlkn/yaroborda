import React, { Component } from 'react';

import OpPost from '../op-post';
import Post from '../post';
import TopBigButton from '../top-big-button';
import CreatePost from '../create-post';

import Api from '../../BordaApi';

class Thread extends Component {
    api = new Api();

    state = {
        showForm: false
    }

    toggleForm = () => this.setState(state => ({
        showForm: !state.showForm
    }))

    render() {
        const { showForm } = this.state;

        return (
            <>
                {!showForm && <TopBigButton value="add new post" toggle={this.toggleForm} />}

                {showForm && <CreatePost toggle={this.toggleForm} />}

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
