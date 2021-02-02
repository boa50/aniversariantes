import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Progress from './ui/progress';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '10%',
        },
        [theme.breakpoints.up('sm')]: {
            height: '85vh',
        },
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
}));

type Props = {
    formik: any;
    progressShow?: boolean;
};

const Form: React.FC<Props> = ({ formik, progressShow = false, children }) => {
    const classes = useStyles();

    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            justify="center"
        >
            <Grid item>
                <Progress show={progressShow} />
                <form
                    autoComplete="off"
                    noValidate
                    onSubmit={formik.handleSubmit}
                    onReset={formik.handleReset}
                    className={classes.form}
                >
                    {children}
                </form>
            </Grid>
        </Grid>
    );
};

export default Form;
