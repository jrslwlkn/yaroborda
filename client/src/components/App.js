import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TopHeader from './top-header';
import Board from './board';
import Thread from './thread';
import NotFound from './not-found';
import Home from './home';

const homeTexts = ['Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem pariatur repudiandae fugiat facere reprehenderit, sequi atque quidem ex, vitae quibusdam magnam laboriosam architecto optio tempore a nulla harum, quos eveniet!', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem pariatur repudiandae fugiat facere reprehenderit, sequi atque quidem ex, vitae quibusdam magnam laboriosam architecto optio tempore a nulla harum, quos eveniet!'];

class App extends Component {
    render() {
        return (
            <>
                <TopHeader />
                {/* <Route path="/" exact component={<Home texts={homeTexts} />} /> */}
                <Home texts={homeTexts} />
                {/* <Route path="/:board/" component={Board} />
                <Route path="/:board/:thread/" component={Board} /> */}
                {/* <NotFound /> */}
                <Board />
            </>
        );
    }
}

export default App;
