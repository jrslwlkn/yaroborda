import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import OpPost from '../op-post';
import Post from '../post';
import TopBigButton from '../top-big-button';
import CreatePost from '../create-post';
import Spinner from '../spinner';

import Api from '../../BordaApi';
import { getThread, updateNewPost, addPost } from '../../actions';

class Thread extends Component {
    api = new Api();

    state = {
        showForm: false,
        loading: true,
        showBox: false
    }

    toggleForm = () => this.setState(state => ({
        showForm: !state.showForm
    }))

    addIdToNewPost = (id) => {
        const { newPost, updateNewPost } = this.props;
        if (!newPost.text.includes(`->${id}`)) {
            let text = `${newPost.text}\n->${id}\n`;
            if (newPost.text === '') text = `${newPost.text}->${id}\n`;
            updateNewPost({ ...newPost, text });
            this.setState({ showForm: true });
            console.log(text);
        }
    }

    toggleSage = () => {
        const { updateNewPost, newPost } = this.props;
        const sage = !newPost.sage;
        console.log(!newPost.sage);
        updateNewPost({ ...newPost, sage });
    }

    onAdd = (obj) => {
        this.props.addPost(obj);
        if (this.api.validateNewPost(false, obj)) {
            this.toggleForm();
            this.setState({ showBox: true });

            let id;
            const { board, thread } = this.props.match.params;
            this.api.getLastPost(board, thread)
                .then(post => {
                    window.location.reload();
                    id = post.id;
                });
            document.getElementById(id).scrollIntoView();
        }
    }

    scrollTest = () => {
        document.getElementById(`67`).scrollIntoView();
    }

    componentDidMount = () => {
        console.log(window.location.hash);
        if (this.props.newPost.text[this.props.newPost.text.length - 1] === '\n') console.log('/n');

        const {
            getThread, updateNewPost, history, match
        } = this.props;
        const { board, thread } = match.params;

        if (!this.api.validateNumber(thread)) return history.push('/no/such/page/found');

        this.api.getOpPost(board, thread)
            .then(op => {
                if (!op) return history.push('/no/such/page/found');
                getThread(board, thread, op);
                updateNewPost({ board, thread });
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log(err);
                history.push('/no/such/page/found');
            });
    }

    render() {
        const { showForm, loading } = this.state;
        const {
            thread, newPost, match, updateNewPost
        } = this.props;
        const { threadIsLoading, posts } = thread;

        let content = <Spinner />;
        if (!loading && !threadIsLoading) {
            content = (
                <>
                    {showForm
                        ? (
                            <CreatePost
                                toggleForm={this.toggleForm}
                                addPost={this.onAdd}
                                newPost={newPost}
                                updateNewPost={updateNewPost}
                                toggleSage={this.toggleSage}
                            />
                        )
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

export default connect(mapStateToProps, { getThread, updateNewPost, addPost })(withRouter(Thread));
