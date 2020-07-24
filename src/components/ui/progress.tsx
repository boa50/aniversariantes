import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
        margin: 'auto',
        marginBottom: theme.spacing(1),
    },
}));

type Props = {
    show: boolean;
};

const Progress: React.FC<Props> = ({ show }) => {
    const classes = useStyles();

    let content = <div style={{ height: '12px' }} />;
    if (show) {
        content = (
            <LinearProgress
                color="secondary"
                variant="indeterminate"
                className={classes.root}
            />
        );
    }

    return content;
};

export default Progress;
