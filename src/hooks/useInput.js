import { useState } from "react";

export function useInput(initialData, validationFn, transformFn = (value) => value) {
    const [enteredValue, setEnteredValue] = useState(initialData);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn ? validationFn(enteredValue) : true;

    function handleInputChange(event) {
        let value = transformFn(event.target.value);
        setEnteredValue(value);
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true)
    }

    function handleInputReset() {
        setEnteredValue('');
        setDidEdit(false);
    }

    return {
        value: enteredValue,
        setValue: setEnteredValue,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid,
        handleInputReset,
    }
}