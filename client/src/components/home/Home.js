import React from 'react';
import HomeColumn from './HomeColumn';
import HomeText from './HomeText';
import logo from './logo.png';

export default function Home({ texts }) {
    const textContent = texts.map((t, id) => <HomeText text={t} key={id} />);

    return (
        <>
            <div className="mw5 w-50-ns center ma3 mb0 tc">
                <img src={logo} alt="" />
            </div>
            <h2 className="tc mt0 w-100">YaroBorda — Welcome. Again.</h2>

            <section className="w-100 mw7-ns center bg-white tj shadow-1">
                <div className="cf">

                    <HomeColumn />
                    <HomeColumn />
                    <HomeColumn />
                    <HomeColumn />

                </div>
            </section>

            <section className="w-100 mw7-ns center bg-white tj pv1 shadow-1 mv4">
                {textContent}
            </section>
        </>
    );
}
