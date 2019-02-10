import React, { Component } from 'react';
import {
    BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import TopHeader from './top-header';
import Board from './board';
import Thread from './thread';
import NotFound from './not-found';
import Home from './home';
import ErrorBoundary from './error-boundary';

const homeTexts = ['Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem pariatur repudiandae fugiat facere reprehenderit, sequi atque quidem ex, vitae quibusdam magnam laboriosam architecto optio tempore a nulla harum, quos eveniet!', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem pariatur repudiandae fugiat facere reprehenderit, sequi atque quidem ex, vitae quibusdam magnam laboriosam architecto optio tempore a nulla harum, quos eveniet!'];

class App extends Component {
    render() {
        return (
            <Router>
                <ErrorBoundary>
                    <TopHeader />
                    <Switch>
                        <Route path="/" exact render={() => <Home texts={homeTexts} />} />
                        <Route path="/:board/" exact component={Board} />
                        <Route path="/:board/:thread/" exact component={Thread} />
                        <Route component={NotFound} />
                    </Switch>
                </ErrorBoundary>
            </Router>
        );
    }
}

export default App;
