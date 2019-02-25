import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import { withRouter } from 'react-router-dom';

import OpPost from '../op-post';
import Post from '../post';
import TopBigButton from '../top-big-button';
import CreatePost from '../create-post';
import Spinner from '../spinner';
import SpinnerBox from '../spinner-box';

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

            // const { board, thread } = this.props.match.params;
            // this.api.getLastPost(board, thread)
            //     .then(post => {
            //         // window.location.reload();
            //         console.log(post.id);
            //         // this.props.history.push(`/${board}/${thread}/#${post.id}`);
            //         // window.scrollTo(0, this.lastPostRef.current.offsetTop);
            //     });
        }
    }

    componentDidMount = () => {
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

    componentDidUpdate = () => {
        if (this.api.isDirty(this.props.newPost)) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = undefined;
        }
    }

    render() {
        const { showForm, loading, showBox } = this.state;
        const {
            thread, newPost, match, updateNewPost
        } = this.props;
        const { threadIsLoading, posts } = thread;

        let content = <Spinner />;
        if (!loading && !threadIsLoading) {
            content = (
                <>
                    <Prompt
                        message={'Are you sure you want to leave the page?\nYour post may not be saved.'}
                        when={this.api.isDirty(newPost)}
                    />
                    {showBox && <SpinnerBox />}
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

                    <OpPost
                        {...thread.opPost}
                        func={() => this.addIdToNewPost(thread.opPost.id)}
                        link={`${match.url}`}
                        size={this.api.getSizeBase64(thread.opPost.img_byte_size)}
                    />

                    {posts.length
                        ? posts.map(post => (
                            <Post
                                key={post.id}
                                {...post}
                                func={() => this.addIdToNewPost(post.id)}
                                link={`${match.url}`}
                                size={this.api.getSizeBase64(post.img_byte_size)}
                            />
                        ))
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

export default connect(mapStateToProps,
    { getThread, updateNewPost, addPost })(withRouter(Thread));
