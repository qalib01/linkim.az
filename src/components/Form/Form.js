import React, { useState } from 'react';
import { apiRequest } from '../../utils/apiRequest';
import Alert from '../Alert/Alert';
import Input from './Input';
import { useInput } from '../../hooks/useInput';

const Form = ({ config, initialData = {}, onClose }) => {
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputs = config.fields.reduce((acc, field) => {
        acc[field.id] = useInput(
            initialData[field.id] || '',
            field.validation,
            field.transform || ((value) => value)
        );
        return acc;
    }, {});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Collect all values from the inputs
        const formData = {};
        let hasError = false;
        config.fields.forEach((field) => {
            const { value, hasError: fieldHasError } = inputs[field.id];
            formData[field.id] = value;

            if (field.required && fieldHasError) {
                hasError = true;
            }
        });

        if (hasError) {
            setIsLoading(false);
            return setSubmitStatus({ type: 'error', message: 'Xahiş olunur bütün sahələri düzgün doldurun.' });
        }

        try {
            const body =
                config.fields.some((field) => field.type === 'file') // Check if any field is a file
                    ? new FormData(
                          Object.entries(formData).forEach(([key, value]) => {
                              formData.append(key, value);
                          })
                      )
                    : JSON.stringify(formData);

            const headers = {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            };
            if (!(body instanceof FormData)) headers['Content-Type'] = 'application/json';
            
            const response = await apiRequest({
              url: config.submitUrl,
              method: config.submitMethod,
              // headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
              body,
            });

            const data = await response.json();
            setIsLoading(false);

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: data.message });
                setTimeout(() => window.location.reload(), 2000);
            } else {
                setSubmitStatus({ type: 'error', message: data.message });
            }
        } catch (error) {
            setIsLoading(false);
            setSubmitStatus({ type: 'error', message: 'Bir xəta baş verdi!' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {config.fields.map((field) => {
                const input = inputs[field.id];
                return (
                    <div key={field.id} className="form-group">
                        <label htmlFor={field.id}>{field.label}</label>
                        <Input
                            id={field.id}
                            type={field.type || 'text'}
                            name={field.id}
                            placeholder={field.placeholder}
                            value={input.value}
                            required={field.required}
                            onChange={input.handleInputChange}
                            onBlur={input.handleInputBlur}
                            disabled={field.disabled}
                            readOnly={field.readonly}
                            className={`form-control ${input.hasError ? 'is-invalid' : ''}`}
                        />
                        {input.hasError && (
                            <div className="invalid-feedback">
                                {field.errorMessage || 'Bu sahəni düzgün doldurun.'}
                            </div>
                        )}
                        {field.info && <small className="form-text text-muted">{field.info}</small>}
                    </div>
                );
            })}
            <div className="text-end mt-3">
                <button type="submit" className="btn bg-gradient-primary mx-2" disabled={isLoading}>
                    {isLoading ? 'Göndərilir...' : 'Göndər'}
                </button>
                <button type="button" className="btn bg-dark text-white" onClick={onClose}>
                    Bağla
                </button>
            </div>
            {submitStatus && (
                <Alert
                    type={submitStatus.type}
                    message={submitStatus.message}
                    handleCloseAlertBox={() => setSubmitStatus(null)}
                />
            )}
        </form>
    );
};

export default Form;