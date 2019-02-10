import React from 'react';
import Draggable from 'react-draggable';
import './create-thread.css';

const CreateThread = ({ toggle }) => {
    let form;
    if (window.innerWidth > 777) {
        form = (
            <Draggable>
                <article id="drag" className="mw5 mw6-ns absolute ba bg-white">
                    <div id="drag-header" className="b f4 bg-near-black white pv2 ph3 tc">
                        Create a new thread
                        <button onClick={toggle} type="button" className="pointer fr pa0 ph1 mb1 bg-purple white">x</button>
                    </div>
                    <div className="pa3 bt">
                        <form method="POST" onSubmit={() => '...'} encType="multipart/form-data">
                            <div className="fl w-70">
                                <input placeholder="thread title" id="name" className="input-reset ba b--black pa2 mb2 db w-100" type="text" />
                            </div>
                            <div className="fr w-25">
                                <button type="submit" id="submit" className="ba white b--black bg-light-purple pa2 mb2 db w-100 pointer b">submit</button>
                            </div>
                            <div className="fr w-100">
                                <textarea rows="10" placeholder="write your post" id="text-body" className="ba b--black pa2 mb2 db w-100" />
                            </div>
                            <div className="fr w-100">
                                <label htmlFor="picture" className="ba bg-white pa2 mb2 db pointer tc">add an image (click)</label>
                                <input type="file" accept="image/*" name="picture" id="picture" className="dn" />
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
                        <button onClick={toggle} type="button" className="pointer fr pa0 ph1 mb1 bg-purple white">x</button>
                    </div>
                    <form onSubmit={() => '...'} encType="multipart/form-data">
                        <div className="fl w-70">
                            <input placeholder="thread title" id="name" className="input-reset ba b--black pa2 mb2 db w-100" type="text" />
                        </div>
                        <div className="fr w-25">
                            <button type="submit" id="submit" className="ba white b--black pa2 mb2 db w-100 pointer b bg-near-black">submit</button>
                        </div>
                        <div className="fr w-100">
                            <textarea rows="10" placeholder="write your post" id="text-body" className="ba b--black pa2 mb2 db w-100" />
                        </div>
                        <div className="fr w-100">
                            <label htmlFor="picture" className="ba bg-white pa2 mb2 db pointer tc">add an image (click)</label>
                            <input type="file" accept="image/*" name="picture" id="picture" className="dn" />
                        </div>
                    </form>
                </div>
            </article>
        );
    }

    return form;
};

export default CreateThread;
