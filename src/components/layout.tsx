import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';

import Header from './header';
import SEO from './seo';
import { useAuthCheck } from '../hooks/useAuthCheck';

import { AuthState } from '../models/AuthState';
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

    const authLoading = useSelector((state: AuthState) => state.auth.loading);
    const onInitProperties = useCallback(
        (isMobile: boolean) => dispatch(initProperties(isMobile)),
        [],
    );

    useEffect(() => {
        onInitProperties(isMobile);
    }, [onInitProperties, isMobile]);

    useAuthCheck(location);

    let conteudo = <div data-testid="vazio" />;

    if (!authLoading) {
        conteudo = (
            <Box>
                <CssBaseline />
                <Header />
                <SEO title={title} />
                <Container maxWidth="md">{children}</Container>
            </Box>
        );
    }

    return <ThemeProvider theme={theme}>{conteudo}</ThemeProvider>;
};

export default Layout;
