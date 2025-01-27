import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../../utils/apiRequest';
import Alert from '../Alert/Alert';
import Input from './Input';
import { useInput } from '../../hooks/useInput';
import errorMessages from '../../statusMessages/error';
import Select from './Select';
import Textarea from './Textarea';
import Button from '../Button/Button';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import classes from './Form.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const generateInputs = (fields, initialData) => {
    const formData = {};
    return fields.map((field) => {
        const validationFn = (value) => {
            if (field.id === 'confirmPassword') return field.validation(value, formData.password);
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
    const [formConfig, setFormConfig] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [inputs, setInputs] = useState({});
    const { setLocalUser, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => { setFormConfig(config) }, [config])

    // const inputHooks = formConfig?.fields ? generateInputs(formConfig.fields, initialData) : [];
    const inputHooks = useMemo(
        () => formConfig?.fields ? generateInputs(formConfig.fields, initialData) : [],
        [formConfig?.fields, initialData]
    );
    // const inputs = formConfig?.fields?.reduce((acc, field, index) => {
    //     acc[field.id] = inputHooks && inputHooks[index];
    //     return acc;
    // }, {});

    const inputs = useMemo(() => {
        return formConfig?.fields?.reduce((acc, field, index) => {
            acc[field.id] = inputHooks && inputHooks[index];
            return acc;
        }, {});
    }, [formConfig?.fields, inputHooks]);

    console.log('Before handleSubmit useCallBack')
    const handleSubmit = useCallback(async (e) => {
        console.log('After handleSubmit useCallBack')
        e.preventDefault();
        console.log(e)
        setIsLoading(true);

        let formData = {};

        formConfig.fields?.forEach((field) => {
            const input = inputs[field.id];
            const value = field.type === 'file' ? input.fileRef.current?.files[0] : input.value;

            if (formConfig.submitUrl.includes('contact') || formConfig.submitUrl.includes('reset-password')) {
                formData[field.id] = value;
            } else if (value !== initialData[field.id]) {
                formData[field.id] = value;
            }
        });

        if (!formConfig.submitUrl.includes('login') && formData.password !== formData.confirmPassword) {
            setIsLoading(false);
            return setSubmitStatus(errorMessages.PASSWORDS_MUST_BE_SAME);
        }

        if (formConfig.fields?.some((field) => inputs[field.id].hasError)) {
            setIsLoading(false);
            return setSubmitStatus(errorMessages.ALL_FIELDS_REQUIRED);
        }

        const body = formConfig.fields?.some((field) => field.type === 'file')
            ? createFormData(formData)
            : JSON.stringify(formData);

        try {
            const res = await apiRequest({
                url: formConfig.submitUrl,
                method: formConfig.submitMethod,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
                },
                body,
            });

            if (formConfig.submitUrl.includes('login') && res.data?.tokens) {
                const { accessToken } = res.data.tokens;

                if (accessToken) {
                    setLocalUser(res.data.user);
                    setIsAuthenticated(true);
                    localStorage.setItem('accessToken', accessToken);
                    navigate('/u/');
                } else {
                    setSubmitStatus(errorMessages.TOKEN_CANNOT_GET);
                }
            } else {
                setSubmitStatus(res.data);
                if (res.status === 200) {
                    setTimeout(() => window.location.reload(), 2000);
                }
            }
        } catch (err) {
            setSubmitStatus(errorMessages.GENERAL_ERROR);
        } finally {
            setIsLoading(false);
        }
    }, [formConfig, inputs, initialData, navigate, setLocalUser, setIsAuthenticated]);

    return (
        <form className={attributes?.classList} onSubmit={handleSubmit}>
            {formConfig.contents?.map((content, index) => (
                <div key={index}>
                    {typeof content === 'function' ? content({ ...initialData }) : content}
                </div>
            ))}

            <div className='row'>
                {formConfig.fields && formConfig.fields.map((field) => {
                    const input = inputs[field.id];

                    return (
                        <div key={field.id} className={`mb-2 ${field.grid ? `col-${field.grid.col}` : 'col-12'}`}>
                            {field.type !== 'button' && <label htmlFor={field.id}>{field.label}</label>}

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
                            ) : field.type === 'button' ? (
                                <Button
                                    id={field.id}
                                    type={field.type}
                                    name={field.name}
                                    asButton={field.asButton}
                                    onClick={() => setFormConfig(field.config)}
                                    className={`border-0 bg-transparent btn bg-gradient-primary p-2 m-0 h6 ${field.classList}`}
                                >
                                    {field.label}
                                </Button>
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

                            {
                                formConfig.submitUrl.includes('login') && field.type === 'password' && (
                                    <div className={classes.hasAccount}>
                                        <p> Şifrəni unutmusansa, <Link to='/p/reset-password'>buradan</Link> yeniləyə bilərsən. </p>
                                    </div>
                                )
                            }
                        </div>
                    );
                })}
            </div>

            <div className={`text-${attributes?.buttonLoc || 'end'} mt-3`}>
                {formConfig?.buttons?.map((button, index) => {
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

Form.propTypes = {
    config: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Form;