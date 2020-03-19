import React from 'react';

import Box from '@material-ui/core/Box';

import Pagination from './pagination';

const TrocaMes = props => {
    return (
        <Box textAlign="center">
            <Pagination
                listener={props.listener}
                page={props.mes}
                lastPage={12}
            />
        </Box>
    );
};

export default TrocaMes;
