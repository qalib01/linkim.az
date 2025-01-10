import { useRef, useState } from "react";

export function useInput(initialData, validationFn, transformFn = (value) => value) {
    const [enteredValue, setEnteredValue] = useState(initialData || '');
    const fileRef = useRef(null);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn ? validationFn(enteredValue || fileRef.current?.files[0]) : true;

    function handleInputChange(event) {
        if (event.target.type !== 'file') {
            let value = transformFn(event.target.value);
            setEnteredValue(value);
        };
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true);
    }

    function handleInputReset() {
        setEnteredValue(initialData || '');
        if (fileRef.current) {
            fileRef.current.value = '';
        }
        setDidEdit(false);
    }

    return {
        value: enteredValue,
        setValue: setEnteredValue,
        fileRef,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid,
        handleInputReset,
    }
}