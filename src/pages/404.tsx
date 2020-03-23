import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Layout from '../components/layout';

const NotFound = () => {
    return (
        <Layout title="Not Found">
            <Typography component="div">
                <Box textAlign="center" fontSize="h2.fontSize">
                    404 - Página Não Encontrada ;(
                </Box>
            </Typography>
            <div className="container"></div>
        </Layout>
    );
};

export default NotFound;
