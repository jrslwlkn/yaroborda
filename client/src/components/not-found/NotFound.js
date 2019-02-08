import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="vh-100 bg-white">
      <header className="tc ph5 lh-copy">
        <h1 className="f1 f-headline code mb3 fw9 dib tracked-tight light-purple">404</h1>
        <h2 className="tc f1 fw1">Page not found.</h2>
        <h3><Link to="/" className="link hover-bg-purple purple hover-white f3">Go home</Link></h3>
      </header>
    </section>
  );
}
