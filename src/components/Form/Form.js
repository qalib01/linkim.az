import React, { useState } from 'react';
import { apiRequest } from '../../utils/apiRequest';
import Alert from '../Alert/Alert';
import Input from './Input';
import { useInput } from '../../hooks/useInput';
import errorMessages from '../../statusMessages/error';
import Select from './Select';
import Textarea from './Textarea';


const generateInputs = (fields, initialData) => {
    return fields.map((field) =>
        useInput(
            initialData[field.id] || '',
            field.validation,
            field.transform || ((value) => value),
        )
    );
};

const createFormData = (formData) => {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
    });
    return form;
};

function Form({ config, initialData, onClose }) {
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputHooks = generateInputs(config.fields, initialData);
    const inputs = config.fields.reduce((acc, field, index) => {
        acc[field.id] = inputHooks[index];
        return acc;
    }, {});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = config.fields.reduce((acc, field) => {
            const { value } = inputs[field.id];
            acc[field.id] = value;
            return acc;
        }, {});

        const hasError = config.fields.some((field) => field.required && inputs[field.id].hasError);
        if (hasError) {
            setIsLoading(false);
            return setSubmitStatus(errorMessages.ALL_FIELDS_REQUIRED);
        }

        const body = config.fields.some((field) => field.type === 'file') ? createFormData(formData) : JSON.stringify(formData);
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
            setIsLoading(false);

            if (res.status === 200) {
                setSubmitStatus(res.data);
                setTimeout(() => window.location.reload(), 2000);
            } else {
                setSubmitStatus(res.data);
            }
        } catch (err) {
            setIsLoading(false);
            setSubmitStatus(errorMessages.GENERAL_ERROR);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                {config.fields.map((field) => {
                    const input = inputs[field.id];
                    return (
                        <div className={'col-md-12' + field.grid ? `col-${field.grid.col}` : 'col-12'}>
                            <div key={field.id} className="">
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
                                        value={input.value}
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
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="text-end mt-3">
                <button type="submit" className="btn bg-gradient-primary mx-2" disabled={isLoading}>
                    {isLoading ? 'Göndərilir...' : 'Göndər'}
                </button>
                <button type="button" className="btn bg-dark text-white" onClick={onClose}>
                    Bağla
                </button>
            </div>
            {submitStatus && (
                <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
            )}
        </form>
    );
};

export default Form;