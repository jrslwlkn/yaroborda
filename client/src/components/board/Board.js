import React, { Component } from 'react';

import OpPost from '../op-post';
import Post from '../post';
import TopBigButton from '../top-big-button';
import CreateThread from '../create-thread';

import Api from '../../BordaApi';

class Board extends Component {
    api = new Api();

    state = {
        showForm: false
    }

    toggleForm = () => this.setState(state => ({
        showForm: !state.showForm
    }))

    render() {
        const { showForm } = this.state;
        this.api.getAllBoards().then(console.log);
        this.api.addThread('pr', {
            board: 'pr',
            text: 'FROM API!!!!',
            title: 'API WORKS',
            img: 'img'
        }).then(console.log);
        this.api.getBoard('pr').then(console.log);

        return (
            <>
                <h1 className="tc">/pr - Programming</h1>

                {!showForm && <TopBigButton value="add new thread" toggle={this.toggleForm} />}

                {showForm && <CreateThread toggle={this.toggleForm} />}

                <OpPost />
                <Post />
                <OpPost />
                <Post />
                <OpPost />
                <Post />
            </>
        );
    }
}

export default Board;
