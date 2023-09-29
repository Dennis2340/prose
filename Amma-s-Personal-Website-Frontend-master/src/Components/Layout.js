import React from 'react';
import { Outlet } from 'react-router-dom';
const Layout = props => {
    return <main className='App'>
        <Outlet/>
    </main>;
};

Layout.propTypes = {};

export { Layout };