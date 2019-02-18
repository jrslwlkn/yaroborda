import React, { Component } from 'react';

import Spinner from '../spinner';
import './spinner-box.css';

export default class SpinnerBox extends Component {
    render() {
        return (
            <div className="spinner-box bg-white pa5 b--black ba">
                <Spinner />
            </div>
        );
    }
}
