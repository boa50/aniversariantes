import React from 'react';
import { useMediaQuery } from 'react-responsive';

import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

const TrocaMes = props => {
    const isBigScreen = useMediaQuery({ minWidth: 550 });
    let showFirstLastButton = false;
    let siblingCount = 0;

    if (isBigScreen) {
        showFirstLastButton = true;
        siblingCount = 6;
    }

    return (
        <Box display="flex" justifyContent="center">
            <Pagination
                count={12}
                shape="rounded"
                color="primary"
                showFirstButton={showFirstLastButton}
                showLastButton={showFirstLastButton}
                onChange={props.changeHandler}
                page={props.mes}
                siblingCount={siblingCount}
            />
        </Box>
    );
};

export default TrocaMes;
