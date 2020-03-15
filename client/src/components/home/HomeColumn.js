import React from 'react';
import HomeLink from './HomeLink';

export default function HomeColumn({ name, links }) {
    return (
        <div className="fl w-25-ns w-50 tc lh-copy mb2">
            <p className="b mb1">{name}</p>
            {links.map((l, i)=> <HomeLink key={l.label+i} name={l.label} url={l.url} />)}
        </div>
    );
}
