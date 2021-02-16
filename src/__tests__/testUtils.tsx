import { runSaga, Saga } from 'redux-saga';
import { fireEvent, waitFor } from '@testing-library/react';
import { HtmlHTMLAttributes } from 'react';

export const isDisplayed = (func: Function, id: string) => {
    try {
        const componentStyle = func(id).style;
        if (componentStyle._values.display == 'none') {
            return false;
        } else {
            return true;
        }
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

const getInput = (textField: HTMLElement) => {
    return textField.children[0].children[0] as HTMLInputElement;
};

export const getInputValue = (textField: HTMLElement) => {
    return getInput(textField).value;
};

export const setInputValue = async (
    textField: HTMLElement,
    value: any,
): Promise<HTMLInputElement> => {
    const input = getInput(textField);
    let target = {};

    if (value instanceof Date) {
        target = { valueAsDate: value };
    } else {
        target = { value: value };
    }

    await waitFor(() => {
        fireEvent.change(input, {
            target: target,
        });
    });

    return input;
};

export const isInputEnabled = (inputField: HTMLElement): boolean => {
    if (inputField.children[0].className.indexOf('Mui-disabled') < 0) {
        return true;
    } else {
        return false;
    }
};
