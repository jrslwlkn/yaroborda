import React, { Component } from 'react';

import HomeColumn from './HomeColumn';
import HomeText from './HomeText';

import logo from './logo.png';
import Spinner from '../spinner';

import Api from '../../BordaApi';

class Home extends Component {
    api = new Api()

    state = {
        boards: {},
        loading: true
    }

    componentDidMount() {
        this.api.getAllBoards().then(boards => this.setState({ boards, loading: false }));
    }

    render() {
        const { texts } = this.props;
        const textContent = texts.map((t, id) => <HomeText text={t} key={id} />);

        const { boards, loading } = this.state;
        const {
            other, topic, it, japanese
        } = boards;

        let content = <Spinner />;
        if (!loading) {
            content = (
                <>
                    <HomeColumn name={topic[0].theme} links={topic} />
                    <HomeColumn name={it[0].theme} links={it} />
                    <HomeColumn name={japanese[0].theme} links={japanese} />
                    <HomeColumn name={other[0].theme} links={other} />
                </>
            );
        }

        return (
            <>
                <div className="mw5 w-50-ns center ma3 mb0 tc">
                    <img src={logo} alt="" />
                </div>
                <h2 className="tc mt0 w-100">YaroBorda — Welcome. Again.</h2>

                <section className="w-100 mw7-ns center bg-white tj shadow-1">
                    <div className="cf">

                        {content}

                    </div>
                </section>

                <section className="w-100 mw7-ns center bg-white tj pv1 shadow-1 mv4">
                    {textContent}
                </section>
            </>
        );
    }
}

export default Home;
