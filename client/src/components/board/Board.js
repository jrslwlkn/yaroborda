import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import OpPost from '../op-post';
import Post from '../post';
import TopBigButton from '../top-big-button';
import CreateThread from '../create-thread';
import Spinner from '../spinner';

import Api from '../../BordaApi';
import { getBoard } from '../../actions';

class Board extends Component {
    api = new Api();

    state = {
        showForm: false,
        loading: true,
        name: '',
        currentSlice: 10
    }

    toggleForm = () => this.setState(state => ({
        showForm: !state.showForm
    }))

    sliceCalc = (list) => {
        const { currentSlice } = this.state;
        const lastIndex = list.length - 1;

        if (currentSlice < lastIndex) {
            return this.setState(state => ({ currentSlice: state.currentSlice + 1 }));
        }
    }

    autoPagination = (list) => {
        const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
        if (clientHeight + scrollTop === scrollHeight) this.sliceCalc(list);
    }

    componentDidMount = () => {
        const { board } = this.props.match.params;
        this.api.getBoardName(board)
            .then(name => {
                this.props.getBoard(board);
                this.setState({ name, loading: false });
                window.addEventListener('scroll', () => this.autoPagination(this.props.board.threads));
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/no/such/page/found');
            });
    }


    render() {
        const {
            showForm, loading, name, currentSlice
        } = this.state;
        const { board, newThread, match } = this.props;
        const { boardIsLoading, threads } = board;


        const upperPart = (
            <>
                <h1 className="tc">{`/${match.params.board} - ${name}`}</h1>
                {showForm
                    ? <CreateThread toggle={this.toggleForm} />
                    : <TopBigButton value="add new thread" toggle={this.toggleForm} />
                }
            </>
        );

        const slicedThreads = threads.slice(0, currentSlice);

        let content = <Spinner />;
        if (!loading && !boardIsLoading) {
            content = (
                <>
                    {upperPart}
                    {slicedThreads.length ? slicedThreads.map(thread => (
                        <Fragment key={thread.op.id}>
                            <OpPost {...thread.op} link={`${match.url}/${thread.op.id}`} />
                            {Object.keys(thread.lastPost).length > 0
                                && <Post {...thread.lastPost} link={`${match.url}/${thread.op.id}/#${thread.lastPost.id}`} />}
                        </Fragment>
                    )) : <h2 className="tc white">No threads here yet, so add one!</h2>}
                </>
            );
        }

        return <>{content}</>;
    }
}

const mapStateToProps = state => ({
    board: state.board,
    newThread: state.newThread
});

export default connect(mapStateToProps, { getBoard })(withRouter(Board));
