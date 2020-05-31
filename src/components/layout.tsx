import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Header from './header';
import SEO from './seo';

import { initProperties } from '../store/actions';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: red[400],
        },
        secondary: {
            main: blue[500],
        },
    },
});

type Props = {
    title: string;
};

const Layout: React.FC<Props> = ({ title, children }) => {
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const onInitProperties = useCallback(
        (isMobile: boolean) => dispatch(initProperties(isMobile)),
        [],
    );

    useEffect(() => {
        onInitProperties(isMobile);
    }, [onInitProperties, isMobile]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <SEO title={title} />
            <Container maxWidth="md">{children}</Container>
        </ThemeProvider>
    );
};

export default Layout;
