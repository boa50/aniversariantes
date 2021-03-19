import { runSaga, Saga } from 'redux-saga';
import { fireEvent, waitFor } from '@testing-library/react';

export const isDisplayed = (
    func: Function,
    id: string,
    index: number | undefined = undefined,
) => {
    try {
        let componentStyle = func(id).style;
        if (index !== undefined) {
            componentStyle = func(id)[index].style;
        }

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

export const setComboValue = async (
    comboField: HTMLElement,
    value: string,
    getByText: Function,
): Promise<HTMLInputElement> => {
    (global as any).document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: {
            nodeName: 'BODY',
            ownerDocument: document,
        },
    });

    const selectField = comboField.children[0].children[1] as HTMLElement;

    await waitFor(() => {
        fireEvent.keyDown(selectField, {
            key: 'ArrowDown',
        });
    });

    await waitFor(() => getByText(new RegExp(value)));
    await waitFor(() => {
        fireEvent.click(getByText(new RegExp(value)));
    });

    return getInput(selectField);
};

export const isInputEnabled = (
    inputField: HTMLElement,
    autocomplete: boolean = false,
): boolean => {
    let field: any;
    if (autocomplete) {
        field = inputField.children[0].children[1].children[0];
    } else {
        field = inputField.children[0];
    }

    if (field.className.indexOf('Mui-disabled') < 0) {
        return true;
    } else {
        return false;
    }
};
