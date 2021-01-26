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
    formik?: any;
    progressShow?: boolean;
};

const Form: React.FC<Props> = ({
    formik = null,
    progressShow = false,
    children,
}) => {
    const classes = useStyles();

    let formulario;
    if (formik !== null) {
        formulario = (
            <form
                autoComplete="off"
                noValidate
                onSubmit={formik.handleSubmit}
                className={classes.form}
            >
                {children}
            </form>
        );
    } else {
        formulario = <form className={classes.form}>{children}</form>;
    }

    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            justify="center"
        >
            <Grid item>
                <Progress show={progressShow} />
                {formulario}
            </Grid>
        </Grid>
    );
};

export default Form;
