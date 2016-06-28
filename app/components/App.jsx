import React from 'react';

import Menu from './Menu.jsx';

export default function App({children}) {
    return (
        <div id='outer-grid'>
            <div id="header">
                <div id='logo' />
                <div id="header-text">
                    <h1>quasardb</h1>
                    <h2>web administration console</h2>
                </div>
            </div>

            <div id='inner-grid'>
                <Menu />
                {children}
            </div>
        </div>
    );
}
