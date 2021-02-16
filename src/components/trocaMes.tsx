import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import { AniversariantesState } from '../models/AniversariantesState';
import { PropertiesState } from '../models/PropertiesState';

import { setMesInfo } from '../store/actions';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
}));

const TrocaMes: React.FC = () => {
    const classes = useStyles();
    let eventNulo: React.ChangeEvent<unknown>;
    const dispatch = useDispatch();

    const isMobile = useSelector(
        (state: PropertiesState) => state.properties.isMobile,
    );
    const mes = useSelector(
        (state: AniversariantesState) => state.aniversariantes.mes,
    );
    const onSetMes = (mes: number) => dispatch(setMesInfo(mes));

    const changeHandler = (
        event: React.ChangeEvent<unknown>,
        mesNovo: number,
    ) => {
        onSetMes(mesNovo);
    };

    /* istanbul ignore next */
    useHotkeys(
        'left',
        () => {
            if (mes > 1) changeHandler(eventNulo, mes - 1);
        },
        [mes],
    );
    /* istanbul ignore next */
    useHotkeys(
        'right',
        () => {
            if (mes < 12) changeHandler(eventNulo, mes + 1);
        },
        [mes],
    );

    let siblingCount = 6;
    if (isMobile) {
        siblingCount = 0;
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
