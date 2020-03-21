import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

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
            <CssBaseline />
            <Header />
            <SEO title={props.title} />
            <Container maxWidth="md">{props.children}</Container>
        </ThemeProvider>
    );
};

export default Layout;
