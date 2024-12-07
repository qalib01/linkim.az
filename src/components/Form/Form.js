import React, { useState } from 'react';
import { apiRequest } from '../../utils/apiRequest';
import Alert from '../Alert/Alert';
import Input from './Input';
import { useInput } from '../../hooks/useInput';
import errorMessages from '../../statusMessages/error';
import successMessages from '../../statusMessages/success';

// const Form = ({ config, initialData, onClose }) => {
//     const [submitStatus, setSubmitStatus] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const inputHooks = config.fields.map(field => 
//         useInput(
//             initialData[field.id] || '',
//             field.validation,
//             field.transform || ((value) => value),
//         )
//     );

//     const inputs = config.fields.reduce((acc, field, index) => {
//         acc[field.id] = inputHooks[index];
//         return acc;
//     }, {});

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         let hasError = false;
//         // const formData = {};
//         // config.fields.forEach((field) => {
//         //     const { value, hasError: fieldHasError } = inputs[field.id];
//         //     formData[field.id] = value;

//         //     if (field.required && fieldHasError) {
//         //         hasError = true;
//         //     }
//         // });

//         const formData = config.fields.reduce((acc, field) => {
//             const { value } = inputs[field.id];
//             acc[field.id] = value;
//             return acc;
//         }, {});

//         if (hasError) {
//             setIsLoading(false);
//             return setSubmitStatus({ type: 'error', message: 'Xahiş olunur bütün sahələri düzgün doldurun.' });
//         }

//         try {
//             const body =
//                 config.fields.some((field) => field.type === 'file')
//                     ? new FormData(
//                           Object.entries(formData).forEach(([key, value]) => {
//                               formData.append(key, value);
//                           })
//                       )
//                     : JSON.stringify(formData);

//             const headers = {
//                 Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//             };
//             if (!(body instanceof FormData)) headers['Content-Type'] = 'application/json';

//             const response = await apiRequest({
//               url: config.submitUrl,
//               method: config.submitMethod,
//               // headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
//               body,
//             });

//             const data = await response.json();
//             setIsLoading(false);

//             if (response.ok) {
//                 setSubmitStatus({ type: 'success', message: data.message });
//                 setTimeout(() => window.location.reload(), 2000);
//             } else {
//                 setSubmitStatus({ type: 'error', message: data.message });
//             }
//         } catch (error) {
//             setIsLoading(false);
//             setSubmitStatus({ type: 'error', message: 'Bir xəta baş verdi!' });
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             {config.fields.map((field) => {
//                 const input = inputs[field.id];
//                 return (
//                     <div key={field.id} className="form-group">
//                         <label htmlFor={field.id}>{field.label}</label>
//                         <Input
//                             id={field.id}
//                             type={field.type || 'text'}
//                             name={field.id}
//                             placeholder={field.placeholder}
//                             value={input.value}
//                             required={field.required}
//                             onChange={input.handleInputChange}
//                             onBlur={input.handleInputBlur}
//                             disabled={field.disabled}
//                             readOnly={field.readonly}
//                             className={`form-control ${input.hasError ? 'is-invalid' : ''}`}
//                         />
//                         {input.hasError && (
//                             <div className="invalid-feedback">
//                                 {field.errorMessage || 'Bu sahəni düzgün doldurun.'}
//                             </div>
//                         )}
//                         {field.info && <small className="form-text text-muted">{field.info}</small>}
//                     </div>
//                 );
//             })}
//             <div className="text-end mt-3">
//                 <button type="submit" className="btn bg-gradient-primary mx-2" disabled={isLoading}>
//                     {isLoading ? 'Göndərilir...' : 'Göndər'}
//                 </button>
//                 <button type="button" className="btn bg-dark text-white" onClick={onClose}>
//                     Bağla
//                 </button>
//             </div>
//             {submitStatus && (
//                 <Alert
//                     type={submitStatus.type}
//                     message={submitStatus.message}
//                     handleCloseAlertBox={() => setSubmitStatus(null)}
//                 />
//             )}
//         </form>
//     );
// };

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

function Form ({ config, initialData, onClose }) {
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

        try {
            const response = await apiRequest({
                url: config.submitUrl,
                method: config.submitMethod,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
                },
                body,
            });
            setIsLoading(false);

            if (response.status === 200) {
                setSubmitStatus(successMessages.USERNAME_CHANGED);
                setTimeout(() => window.location.reload(), 2000);
            } else {
                setSubmitStatus(response.data);
            }
        } catch (err) {
            setIsLoading(false);
            setSubmitStatus(errorMessages.GENERAL_ERROR);
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
                            placeholder={field.placeholder}
                            value={input.value}
                            required={field.required}
                            onChange={input.handleInputChange}
                            onBlur={input.handleInputBlur}
                            disabled={typeof field.disabled === 'function' ? field.disabled(initialData) : field.disabled}
                            readOnly={typeof field.readonly === 'function' ? field.readonly(initialData) : field.readonly}
                            className={`form-control ${input.hasError ? 'is-invalid' : ''}`}
                            info={field.info}
                            error={input.hasError}
                        />
                        {/* {input.hasError && <div className="invalid-feedback">{field.errorMessage || 'Bu sahəni düzgün doldurun.'}</div>} */}
                        {/* {field.info && <small className="form-text text-muted">{field.info}</small>} */}
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
                <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
            )}
        </form>
    );
};

export default Form;