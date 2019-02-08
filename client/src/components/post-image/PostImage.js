import React from 'react';

export default function PostImage() {
  return (
    <div className="v-top">
      <a target="_blank" rel="noopener noreferrer" href="http://tachyons.io/img/super-wide.jpg">
        <img
          src="http://tachyons.io/img/super-wide.jpg"
          className="w-100 mw5-ns fl-ns pr3-ns pa0 pb1 mt1"
          alt=""
        />
      </a>
    </div>
  );
}
