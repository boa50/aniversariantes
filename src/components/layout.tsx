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

type Props = {
    title: string;
    shareParams: { text: String };
};

const Layout: React.FC<Props> = ({ title, shareParams, children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header shareParams={shareParams} />
            <SEO title={title} />
            <Container maxWidth="md">{children}</Container>
        </ThemeProvider>
    );
};

export default Layout;
