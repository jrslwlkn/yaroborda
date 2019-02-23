import React, { Component } from 'react';

import Draggable from 'react-draggable';
import MdEditor from 'react-rte';
import { toolbarConfig } from './md-editor-config';
import './create-thread.css';
import './md-editor.css';
import Modal from '../modal';

class CreateThread extends Component {
    state = {
        editorValue: MdEditor.createValueFromString(this.props.newThread.text, 'markdown'),
    }

    componentDidMount() {
        this.props.updateNewThread({ errors: [] });
    }

    onEditorChange = (editorValue) => {
        this.setState(state => {
            this.props.updateNewThread({ text: editorValue.toString('markdown') });
            if (editorValue !== state.editorValue) return { editorValue };
        });
        console.log(this.state.editorValue.toString('markdown'));
    }

    onTitleChange = (e) => {
        this.props.updateNewThread({ title: e.target.value });
    }

    removeErr = (errId) => {
        const { newThread, updateNewThread } = this.props;
        const errors = newThread.errors.filter((error, i) => i !== errId);
        updateNewThread({ ...newThread, errors });
    }

    onFileChange = (e) => {
        e.preventDefault();
        const imgFile = e.target.files[0];
        if (imgFile !== this.props.newThread.imgFile) this.props.updateNewThread({ imgFile });
        console.log(e.target.files[0]);
    }

    sendForm = (e) => {
        e.preventDefault();

        const {
            title, imgFile, text
        } = this.props.newThread;
        const obj = {
            title,
            text,
            imgFile,
            board: this.props.board
        };
        console.log(obj);
        console.log(obj.text.trim());
        this.props.addThread(obj);
    }


    render() {
        const { toggle, newThread } = this.props;
        const { editorValue } = this.state;
        const { title, errors } = newThread;

        const errMsgs = errors.map((text, i) => <Modal key={i} onRemove={() => this.removeErr(i)} id={i} text={text} isError />);

        let form;
        if (window.innerWidth > 777) {
            form = (
                <Draggable cancel=".cancel">
                    <article id="drag" className="mw5 mw6-ns absolute ba bg-white">
                        <div id="drag-header" className="b f4 bg-near-black white pv2 ph3 tc">
                            Create a new thread
                            <button onClick={toggle} type="button" className="cancel pointer fr pa0 ph1 mb1 bg-purple white outline-0">x</button>
                        </div>
                        <div className="pa3 bt">
                            {errMsgs}
                            <form onSubmit={this.sendForm} encType="multipart/form-data">
                                <div className="fl w-70">
                                    <input placeholder="thread title" id="name" value={title} onChange={this.onTitleChange} className="cancel input-reset ba b--black pa2 mb2 db w-100 outline-0" type="text" />
                                </div>
                                <div className="fr w-30">
                                    <button type="submit" id="submit" className="ba white b--black bg-light-purple pa2 mb2 db w-100 pointer b bl-0 outline-0">submit</button>
                                </div>
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
                                <div className="fr w-100">
                                    <label htmlFor="picture" className="ba bg-white pa2 mb2 db pointer tc">add an image</label>
                                    <input type="file" accept="image/*" name="picture" id="picture" onChange={this.onFileChange} className="dn" />
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
                        <div className="b f4 bg-white pv2 ph3 tc mb2 b--black ba">
                            Create a new thread
                            {' '}
                            {form}
                            <button onClick={toggle} type="button" className="pointer fr pa0 ph1 mb1 bg-purple white outline-0">x</button>
                        </div>
                        <form onSubmit={this.sendForm} encType="multipart/form-data">
                            {errMsgs}
                            <div className="fl w-60">
                                <input placeholder="thread title" value={title} id="name" onChange={this.onTitleChange} className="input-reset ba b--black pa2 mb2 db w-100 outline-0" type="text" />
                            </div>
                            <div className="fr w-40">
                                <button type="submit" id="submit" className="ba white b--black pa2 mb2 db w-100 pointer b bg-near-black outline-0">submit</button>
                            </div>
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
                            <div className="fr w-100">
                                <label htmlFor="picture" className="ba bg-white pa2 mb2 db pointer tc">add an image</label>
                                <input type="file" accept="image/*" onChange={this.onFileChange} name="picture" id="picture" className="dn" />
                            </div>
                        </form>
                    </div>
                </article>
            );
        }
        return form;
    }
}

export default CreateThread;
