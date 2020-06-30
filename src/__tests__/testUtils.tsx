export const isDisplayed = (func: Function, id: string) => {
    try {
        func(id);
        return true;
    } catch (error) {
        return false;
    }
};
