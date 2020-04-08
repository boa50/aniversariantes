import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';
import { useMediaQuery } from 'react-responsive';

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import { AniversariantesState } from '../models/AniversariantesState';

import { setMesInfo } from '../store/actions/aniversariantes';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
}));

const TrocaMes: React.FC = () => {
    const classes = useStyles();
    const isBigScreen = useMediaQuery({ minWidth: 550 });
    let eventNulo: React.ChangeEvent<unknown>;
    const dispatch = useDispatch();

    const mes = useSelector((state: AniversariantesState) => state.mes);
    const onSetMes = (mes: number) => dispatch(setMesInfo(mes));

    const changeHandler = (
        event: React.ChangeEvent<unknown>,
        mesNovo: number,
    ) => {
        onSetMes(mesNovo);
    };

    useHotkeys(
        'left',
        () => {
            if (mes > 1) changeHandler(eventNulo, mes - 1);
        },
        [mes],
    );
    useHotkeys(
        'right',
        () => {
            if (mes < 12) changeHandler(eventNulo, mes + 1);
        },
        [mes],
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
            onChange={changeHandler}
            page={mes}
            siblingCount={siblingCount}
        />
    );
};

export default TrocaMes;
