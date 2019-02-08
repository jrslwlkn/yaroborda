import React, { Component } from 'react';
import OpPost from '../op-post';
import Post from '../post';
import TopBigButton from '../top-big-button';
import CreateThread from '../create-thread';

class Board extends Component {
  state = {
      showForm: true
  }

  render() {
      const { showForm } = this.state;

      return (
      <>
          <h1 className="tc">/pr - Programming</h1>

          {!showForm && <TopBigButton />}

          {showForm && <CreateThread />}

          <OpPost />
          <Post />

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
