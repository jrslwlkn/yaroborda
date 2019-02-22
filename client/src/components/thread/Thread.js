import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import OpPost from '../op-post';
import Post from '../post';
import TopBigButton from '../top-big-button';
import CreatePost from '../create-post';
import Spinner from '../spinner';

import Api from '../../BordaApi';
import { getThread, updateNewPost } from '../../actions';

class Thread extends Component {
    api = new Api();

    state = {
        showForm: false,
        loading: true
    }

    toggleForm = () => this.setState(state => ({
        showForm: !state.showForm
    }))

    addIdToNewPost = (id) => {
        const { newPost, updateNewPost } = this.props;
        let text = `${newPost.text}\n>>>${id}\n`;
        if (newPost.text[newPost.text.length - 1] === '\n') text = `${newPost.text}>>>${id}\n`;
        updateNewPost({ ...newPost, text });
        console.log(text);
    }

    componentDidMount = () => {
        if (this.props.newPost.text[this.props.newPost.text.length - 1] === '\n') console.log('/n');

        const { board, thread } = this.props.match.params;
        if (!this.api.validateNumber(thread)) return this.props.history.push('/no/such/page/found');
        this.api.getOpPost(board, thread)
            .then(op => {
                if (!op) return this.props.history.push('/no/such/page/found');
                this.props.getThread(board, thread, op);
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/no/such/page/found');
            });
    }

    render() {
        const { showForm, loading } = this.state;
        const { thread, newPost, match } = this.props;
        const { threadIsLoading, posts } = thread;

        let content = <Spinner />;
        if (!loading && !threadIsLoading) {
            content = (
                <>
                    {showForm
                        ? <CreatePost toggle={this.toggleForm} />
                        : <TopBigButton value="add new post" toggle={this.toggleForm} />
                    }

                    <OpPost {...thread.opPost} func={() => this.addIdToNewPost(thread.opPost.id)} link={`${match.url}`} size={this.api.getSizeBase64(thread.opPost.img_byte_size)} />

                    {posts.length
                        ? posts.map(post => <Post key={post.id} {...post} func={() => this.addIdToNewPost(post.id)} link={`${match.url}`} size={this.api.getSizeBase64(post.img_byte_size)} />)
                        : null}
                </>
            );
        }

        return <>{content}</>;
    }
}

const mapStateToProps = state => ({
    thread: state.thread,
    newPost: state.newPost
});

export default connect(mapStateToProps, { getThread, updateNewPost })(withRouter(Thread));
