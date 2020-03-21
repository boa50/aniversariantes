import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useMediaQuery } from 'react-responsive';

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

const TrocaMes = props => {
    const classes = useStyles();
    const isBigScreen = useMediaQuery({ minWidth: 550 });

    useHotkeys(
        'left',
        () => {
            if (props.mes > 1) {
                props.changeHandler(null, props.mes - 1);
            }
        },
        [props.mes],
    );
    useHotkeys(
        'right',
        () => {
            if (props.mes < 12) {
                props.changeHandler(null, props.mes + 1);
            }
        },
        [props.mes],
    );

    let siblingCount = 0;
    if (isBigScreen) {
        siblingCount = 6;
    }

    return (
        <Pagination
            className={classes.root}
            data-testid="pagination-material-component"
            count={12}
            shape="rounded"
            color="primary"
            onChange={props.changeHandler}
            page={props.mes}
            siblingCount={siblingCount}
        />
    );
};

export default TrocaMes;
