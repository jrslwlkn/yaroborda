import React, { Component } from 'react';

import Draggable from 'react-draggable';
import MdEditor from 'react-rte';
import { toolbarConfig } from '../create-thread/md-editor-config';
import '../create-thread/md-editor.css';
import './create-post.css';
import Modal from '../modal';

class CreatePost extends Component {
    state = {
        editorValue: MdEditor.createValueFromString(this.props.newPost.text, 'markdown')
    }

    componentDidMount() {
        this.props.updateNewPost({ errors: [] });
    }

    onEditorChange = (editorValue) => {
        this.setState(state => {
            this.props.updateNewPost({ text: editorValue.toString('markdown') });
            if (editorValue !== state.editorValue) return { editorValue };
        });
        console.log(this.state.editorValue.toString('markdown'));
    }

    onFileChange = (e) => {
        e.preventDefault();
        const { updateNewPost, newPost } = this.props;
        const imgFile = e.target.files[0];
        if (imgFile !== newPost.imgFile) updateNewPost({ imgFile });
        console.log(e.target.files[0]);
    }

    sendForm = (e) => {
        e.preventDefault();
        const { addPost, newPost } = this.props;
        const { errors, ...obj } = newPost;
        addPost(obj);
    }

    render() {
        const { toggleForm, toggleSage, newPost } = this.props;
        const { editorValue } = this.state;
        const { errors } = newPost;

        const errMsgs = errors.map((text, i) => <Modal key={i} id={i} text={text} isError />);

        let form;
        if (window.innerWidth > 777) {
            form = (
                <Draggable cancel=".cancel">
                    <article id="drag" className="mw5 mw6-ns absolute ba bg-white">
                        <div id="drag-header" className="b f4 bg-near-black white pv2 ph3 tc">
                            Add a post
                            <button onClick={toggleForm} type="button" className="cancel pointer fr pa0 ph1 mb1 bg-purple white outline-0">x</button>
                        </div>
                        <div className="pa3 bt">
                            {errMsgs}
                            <form onSubmit={this.sendForm} encType="multipart/form-data">
                                <div className="fr w-100 cancel">
                                    <MdEditor
                                        toolbarConfig={toolbarConfig}
                                        value={editorValue}
                                        onChange={this.onEditorChange}
                                        toolbarClassName="toolbar"
                                        editorClassName="editor-area"
                                        placeholder="write your post here"
                                        className="main-editor"
                                    />
                                </div>
                                <div className="fl w-50">
                                    <label htmlFor="picture" className="ba bg-white pa2 mb2 db pointer tc">add an image</label>
                                    <input type="file" accept="image/*" name="picture" id="picture" onChange={this.onFileChange} className="dn" />
                                </div>
                                <div className="fl center w-20 mt2">
                                    <div className="flex items-center mb2">
                                        <input className="mh2" onChange={toggleSage} checked={newPost.sage} type="checkbox" id="sage" value="sage" />
                                        <label htmlFor="sage" className="b red">SAGE</label>
                                    </div>
                                </div>
                                <div className="fr w-30">
                                    <button type="submit" id="submit" className="ba white bg-light-purple pa2 mb2 db w-100 pointer b b--black outline-0">submit</button>
                                </div>
                            </form>
                        </div>
                    </article>
                </Draggable>
            );
        } else {
            form = (
                <article className="w-100">
                    <div className="pa2">
                        <div className="b f4 bg-white pv2 ph3 tc mv2 b--black ba">
                            Add a post
                            <button onClick={toggleForm} type="button" className="pointer fr pa0 ph1 mb1 bg-purple white outline-0">x</button>
                        </div>
                        <form onSubmit={this.sendForm} encType="multipart/form-data">
                            {errMsgs}
                            <div className="fr w-100 cancel">
                                <MdEditor
                                    toolbarConfig={toolbarConfig}
                                    value={editorValue}
                                    onChange={this.onEditorChange}
                                    toolbarClassName="toolbar"
                                    editorClassName="editor-area"
                                    placeholder="write your post here"
                                    className="main-editor"
                                />
                            </div>
                            <div className="fl w-50">
                                <label htmlFor="picture" className="ba bg-white pa2 mb2 db pointer tc">add an image</label>
                                <input type="file" accept="image/*" onChange={this.onFileChange} name="picture" id="picture" className="dn" />
                            </div>
                            <div className="fl center w-20 mt2">
                                <div className="flex items-center mb2">
                                    <input className="mh2" onChange={toggleSage} checked={newPost.sage} type="checkbox" id="sage" value="sage" />
                                    <label htmlFor="sage" className="b red">SAGE</label>
                                </div>
                            </div>
                            <div className="fr w-30-ns w-20">
                                <button type="submit" id="submit" className="ba white b--black pa2 mb2 db w-100 pointer b bg-near-black outline-0">submit</button>
                            </div>
                        </form>
                    </div>
                </article>
            );
        }
        return form;
    }
}

export default CreatePost;
