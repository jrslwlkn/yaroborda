import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    state = {
        error: null
    }

    componentDidCatch(error) {
        this.setState({ error });
    }

    render() {
        if (this.state.error) return <div className="tc center">Oops, something went wrong.</div>;
        return this.props.children;
    }
}
