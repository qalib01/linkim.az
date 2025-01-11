import React, { useState } from 'react';
import { apiRequest } from '../../utils/apiRequest';
import Alert from '../Alert/Alert';
import Input from './Input';
import { useInput } from '../../hooks/useInput';
import errorMessages from '../../statusMessages/error';
import Select from './Select';
import Textarea from './Textarea';
import Button from '../Button/Button';


const generateInputs = (fields, initialData) => {
    const formData = {};
    return fields.map((field) => {
        const validationFn = (value) => {
            if (field.id === 'confirmPassword') {
                return field.validation(value, formData.password);
            }
            return field.validation(value);
        };

        const inputHook = useInput(
            initialData[field.id] || null,
            validationFn,
            field.transform || ((value) => value)
        );

        formData[field.id] = field.type === 'file' ? inputHook.fileRef.current?.files[0] : inputHook.value;
        return inputHook;
    });
};

const createFormData = (formData) => {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
    });
    return form;
};

function Form({ config, initialData, onClose, attributes }) {
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputHooks = config.fields && generateInputs(config.fields, initialData);
    const inputs = config.fields && config.fields.reduce((acc, field, index) => {
        acc[field.id] = inputHooks[index];
        return acc;
    }, {});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let formData = {};

        if (config.submitUrl.includes('contact') || config.submitUrl.includes('reset-password')) {
            config.fields && config.fields.forEach((field) => {
                formData[field.id] = field.type === 'file' ? inputs[field.id].fileRef.current?.files[0] : inputs[field.id].value;
            })
        } else {
            config.fields && config.fields.some((field) => {
                const { value } = inputs[field.id];
                if (value !== initialData[field.id]) formData[field.id] = field.type === 'file' ? inputs[field.id].fileRef.current?.files[0] : value;
            });
        }

        if (formData.password === '') delete formData.password;
        if (formData.confirmPassword === '') delete formData.confirmPassword;
        if (config.fields && Object.keys(formData).length === 0) {
            setIsLoading(false);
            return setSubmitStatus(errorMessages.CHANGES_NOT_FOUND)
        }

        if (formData.password !== formData.confirmPassword) {
            setIsLoading(false);
            return setSubmitStatus(errorMessages.PASSWORDS_MUST_BE_SAME);
        }

        const hasError = config.fields && config.fields.some((field) => inputs[field.id].hasError);
        if (hasError) {
            setIsLoading(false);
            return setSubmitStatus(errorMessages.ALL_FIELDS_REQUIRED);
        }

        const body = config.fields && config.fields.some((field) => field.type === 'file') ? createFormData(formData) : JSON.stringify(formData);
        console.log(body)
        try {
            const res = await apiRequest({
                url: config.submitUrl,
                method: config.submitMethod,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
                },
                body,
            });

            if (res.status === 200) {
                setSubmitStatus(res.data);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setSubmitStatus(res.data);
            }
        } catch (err) {
            setSubmitStatus(errorMessages.GENERAL_ERROR);
        }
        setIsLoading(false);
    };

    return (
        <form className={attributes?.classList} onSubmit={handleSubmit}>
            <div className='row'>
                {config.fields && config.fields.map((field) => {
                    const input = inputs[field.id];
                    console.log(input)
                    return (
                        <div key={field.id} className={`mb-2 ${field.grid ? `col-${field.grid.col}` : 'col-12'}`}>
                            <label htmlFor={field.id}>{field.label}</label>
                            {field.type === 'select' ? (
                                <Select
                                    id={field.id}
                                    type={field.type || 'text'}
                                    name={field.name}
                                    label={field.label}
                                    value={input.value}
                                    required={field.required}
                                    onChange={input.handleInputChange}
                                    onBlur={input.handleInputBlur}
                                    disabled={typeof field.disabled === 'function' ? field.disabled(initialData) : field.disabled}
                                    readOnly={typeof field.readOnly === 'function' ? field.readOnly(initialData) : field.readOnly}
                                    className={`form-control ${input.hasError ? 'is-invalid' : ''}`}
                                    error={input.hasError}
                                >
                                    {field.options.map((option) => (
                                        <option key={option.key} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Select>
                            ) : field.type === 'textarea' ? (
                                <Textarea
                                    id={field.id}
                                    type={field.type || 'text'}
                                    name={field.name}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    value={input.value}
                                    rows={field.rows}
                                    maxLength={field.maxLength}
                                    required={field.required}
                                    onChange={input.handleInputChange}
                                    onBlur={input.handleInputBlur}
                                    disabled={typeof field.disabled === 'function' ? field.disabled(initialData) : field.disabled}
                                    readOnly={typeof field.readonly === 'function' ? field.readonly(initialData) : field.readonly}
                                    className={`form-control ${input.hasError ? 'is-invalid' : ''}`}
                                    info={field.info}
                                    error={input.hasError}
                                />
                            ) : (
                                <Input
                                    id={field.id}
                                    type={field.type || 'text'}
                                    name={field.name}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    value={field.type === 'file' ? undefined : input.value}
                                    ref={field.type === 'file' ? input.fileRef : undefined}
                                    maxLength={field.maxLength}
                                    required={field.required}
                                    onChange={input.handleInputChange}
                                    onBlur={input.handleInputBlur}
                                    disabled={typeof field.disabled === 'function' ? field.disabled(initialData) : field.disabled}
                                    readOnly={typeof field.readonly === 'function' ? field.readonly(initialData) : field.readonly}
                                    className={`form-control ${input.hasError ? 'is-invalid' : ''}`}
                                    info={!input.value ? field.info : ''}
                                    error={input.hasError}
                                    accept={field.accept}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            {config.contents && config.contents.map((content, index) => {
                return (
                    <div key={index}>
                        { typeof content === 'function' ? content({ ...initialData }) : content}
                    </div>
                )
            })}

            <div className={`text-${ attributes?.buttonLoc || 'end' } mt-3`}>
                {config.buttons.map((button, index) => {
                    return (<Button
                        key={index}
                        type={button.type}
                        classList={button.className}
                        asButton={true || false}
                        disabled={typeof button.disabled === 'function' ? button.disabled(isLoading) : button.disabled}
                        onClick={typeof button.onClick === 'function' ? button.onClick(onClose || '') : undefined}
                    >
                        {typeof button.children === 'function' ? button.children(isLoading) : button.children}
                    </Button>)
                })}
            </div>
            {submitStatus && (<Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />)}
        </form>
    );
};

export default Form;