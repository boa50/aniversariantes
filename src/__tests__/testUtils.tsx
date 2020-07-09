import { runSaga, Saga } from 'redux-saga';

export const isDisplayed = (func: Function, id: string) => {
    try {
        func(id);
        return true;
    } catch (error) {
        return false;
    }
};

export const executeSaga = async (saga: Saga<any[]>, act: any) => {
    const dispatched: any = [];
    await runSaga(
        {
            dispatch: action => dispatched.push(action),
        },
        saga,
        act,
    );

    return dispatched;
};
