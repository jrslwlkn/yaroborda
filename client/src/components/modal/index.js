import React, { Component } from 'react';

export default class Modal extends Component {
    state = {
        show: true
    }

    hide = () => {
        this.setState({ show: false });
    }

    render() {
        const { isError, text } = this.props;
        let styles = 'b bg-white lh-copy v-mid tc mb3';
        if (isError) styles += ' red';

        if (!this.state.show) return null;

        return (
            <div className={styles}>
                <button onClick={this.hide} type="button" className="v-mid fl pointer pa0 ph1 mb1 bg-purple white outline-0">x</button>
                {text}
            </div>
        );
    }
}
