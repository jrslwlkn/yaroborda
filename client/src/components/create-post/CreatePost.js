import React, { Component } from 'react';

import Draggable from 'react-draggable';
import MdEditor from 'react-rte';
import { toolbarConfig } from '../create-thread/md-editor-config';
import '../create-thread/md-editor.css';
import './create-post.css';

class CreatePost extends Component {
    state = {
        editorValue: MdEditor.createEmptyValue()
    }

    onEditorChange = (editorValue) => {
        this.setState(state => {
            if (editorValue !== state.editorValue) return { editorValue };
        });
        console.log(this.state.editorValue.toString('markdown'));
    }

    onFileChange = (e) => {
        this.setState({ currentFile: e.target.files[0] });
        console.log(e.target.files[0]);
    }

    render() {
        const { toggle } = this.props;
        const { editorValue } = this.state;

        let form;
        if (window.innerWidth > 777) {
            form = (
                <Draggable cancel=".cancel">
                    <article id="drag" className="mw5 mw6-ns absolute ba bg-white">
                        <div id="drag-header" className="b f4 bg-near-black white pv2 ph3 tc">
                            Add a post
                            <button onClick={toggle} type="button" className="cancel pointer fr pa0 ph1 mb1 bg-purple white outline-0">x</button>
                        </div>
                        <div className="pa3 bt">
                            <form onSubmit={() => '...'} encType="multipart/form-data">
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
                                    <input type="file" accept="image/*" name="picture" id="picture" className="dn" />
                                </div>
                                <div className="fl center w-20 mt2">
                                    <div className="flex items-center mb2">
                                        <input className="mh2" type="checkbox" id="sage" value="sage" />
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
                            <button onClick={toggle} type="button" className="pointer fr pa0 ph1 mb1 bg-purple white outline-0">x</button>
                        </div>
                        <form onSubmit={() => '...'} encType="multipart/form-data">
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
                                <input type="file" accept="image/*" name="picture" id="picture" className="dn" />
                            </div>
                            <div className="fl center w-20 mt2">
                                <div className="flex items-center mb2">
                                    <input className="mh2" type="checkbox" id="sage" value="sage" />
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
