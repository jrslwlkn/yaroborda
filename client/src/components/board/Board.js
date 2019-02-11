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
        name: ''
    }

    toggleForm = () => this.setState(state => ({
        showForm: !state.showForm
    }))

    componentDidMount = () => {
        const { board } = this.props.match.params;
        this.api.getBoardName(board)
            .then(name => {
                this.props.getBoard(board);
                this.setState({ name, loading: false });
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/no/such/page/found');
            });

        // catch - if err on getBoardName -> history.push -> /not/exist/page -> redirect to 404
    }


    render() {
        const { showForm, loading, name } = this.state;
        const { board, newThread } = this.props;
        const { boardIsLoading, threads, url } = board;


        const upperPart = (
            <>
                <h1 className="tc">{`/${url} - ${name}`}</h1>
                {showForm
                    ? <CreateThread toggle={this.toggleForm} />
                    : <TopBigButton value="add new thread" toggle={this.toggleForm} />
                }
            </>
        );

        let content = <Spinner />;
        if (!loading && !boardIsLoading) {
            content = (
                <>
                    {upperPart}
                    {threads.map(thread => (
                        <Fragment key={thread.op.id}>
                            <OpPost {...thread.op} />
                            {Object.keys(thread.lastPost).length > 0 && <Post {...thread.lastPost} />}
                        </Fragment>
                    ))}
                </>
            );
        }

        // this.api.getBoard('pr')
        //     .then(OPs => OPs.map(op => this.api.getLastPost('pr', op.id)
        //         .then(lastPost => {
        //             if (!lastPost) return { op, lastPost: {} };
        //             return { op, lastPost };
        //         })))
        //     .then(threads => Promise.all(threads)).then(console.log);

        // this.api.getBoardName('pr').then(console.log);

        return <>{content}</>;
    }
}

const mapStateToProps = state => ({
    board: state.board,
    newThread: state.newThread
});

export default connect(mapStateToProps, { getBoard })(withRouter(Board));
