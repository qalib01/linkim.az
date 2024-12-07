import { useState } from "react";

export function useInput(defaultValue, validationFn, transformFn) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

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