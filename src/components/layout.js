import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import Header from './header';
import SEO from './seo';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: red[400],
        },
    },
});

const Layout = props => {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <SEO title={props.title} />
            {props.children}
        </ThemeProvider>
    );
};

export default Layout;
