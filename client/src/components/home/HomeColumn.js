import React from 'react';
import HomeLink from './HomeLink';

export default function HomeColumn() {
  return (
    <div className="fl w-25-ns w-50 tc lh-copy mb2">
      <p className="b mb1">1Video Games</p>
      <HomeLink />
      <HomeLink />
      <HomeLink />
    </div>
  );
}
