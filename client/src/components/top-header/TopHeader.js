import React from 'react';

export function TopHeader() {
    return (
        <header className="w-100 tc white shadow-4">
            <nav className="ph3 ph5-ns pv1">
                <a
                    href="http://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link hover-bg-purple white f4 mr3"
                >
                    source code
                </a>
                <a
                    href="http://yarek.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link hover-bg-purple white f4 mr3"
                >
                    creator
                </a>
                <a
                    href="http://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link hover-bg-purple white f4 mr3"
                >
                    my github
                </a>
            </nav>
        </header>
    );
}
