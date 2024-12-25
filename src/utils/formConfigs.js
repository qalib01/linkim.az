import { Link } from "react-router-dom";
import { hasMaxTrimedLength, hasMinLength, isEqualsToOtherValue, isNotEmpty, isValidPassword, isValidURL, isValidUsername } from "./validation";
const maxDataLength = 300;
const maxRows = 3;
const usernameMinLength = 3;
const usernameMaxLength = 12;

export class ConfigGenerator {
    constructor(baseApiUrl) {
        this.baseApiUrl = baseApiUrl || `${process.env.REACT_APP_API_LINK}`
    }

    generateUserData(mode, linkId) {
        const modes = {
            add: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/add-userData`,
                method: 'POST',
            },
            update: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/update-userData/${linkId}`,
                method: 'POST',
            },
            delete: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/delete-userData/${linkId}`,
                method: 'DELETE'
            },
        }

        return {
            fields: [
                {
                    id: 'name',
                    name: 'name',
                    type: 'text',
                    label: 'Ad',
                    maxLength: 20,
                    placeholder: 'Adın',
                    value: (user) => user?.name || '',
                    validation: (value) => isNotEmpty(value),
                    required: true,
                    grid: { col: 6 },
                },
                {
                    id: 'surname',
                    name: 'surname',
                    type: 'text',
                    label: 'Soyad',
                    maxLength: 20,
                    placeholder: 'Soyadın',
                    value: (user) => user?.surname || '',
                    validation: (value) => isNotEmpty(value),
                    required: true,
                    grid: { col: 6 },
                },
                {
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Email adresin',
                    value: (user) => user?.email || '',
                    validation: (value) => isNotEmpty(value),
                    transform: (value) => value.toLowerCase(),
                    required: true,
                    // disabled: (user) => !!user.email,
                    disabled: (user) => !!user?.email && user?.role?.name !== 'Admin',
                    readOnly: (user) => !!user?.email && user?.role?.name !== 'Admin',
                    grid: { col: 6 },
                },
                {
                    id: 'username',
                    name: 'username',
                    type: 'text',
                    label: 'İstifadəçi adı',
                    placeholder: 'İstifadəçi adın',
                    maxLength: usernameMaxLength,
                    value: (user) => user?.username || '',
                    validation: (value) => isNotEmpty(value) && isValidUsername(value) && hasMinLength(value, usernameMinLength) && hasMaxTrimedLength(value, usernameMaxLength),
                    info: `İstifadəçi adı balaca hərflə, minimum ${usernameMinLength}, maksimum ${usernameMaxLength} xarakter olmalı və xüsusi işarələr istifadə olmamalıdır. Nümunə: link, link01, link_01, link.01`,
                    required: true,
                    disabled: (user) => !!user?.username && user?.role?.name !== 'Admin',
                    readOnly: (user) => !!user?.username && user?.role?.name !== 'Admin',
                    grid: { col: 6 },
                },
                {
                    id: 'password',
                    name: 'password',
                    type: 'password',
                    label: 'Yeni şifrə',
                    placeholder: 'Yeni şifrə',
                    info: 'Şifrə təhlükəsizliklə bağlı böyük, kiçik hərflər, rəqəm və xüsusi işarələr, minimum 8 xarakter olmalıdır. Nümunə: Link01!!',
                    validation: (value) => hasMinLength(value, 8) && isNotEmpty(value) && isValidPassword(value),
                    grid: { col: 6 },
                },
                {
                    id: 'confirmPassword',
                    name: 'confirmPassword',
                    type: 'password',
                    label: 'Yeni şifrənin təkrarı',
                    placeholder: 'Yeni şifrənin təkrarı',
                    validation: (value, otherValue) => isEqualsToOtherValue(value, otherValue),
                    grid: { col: 6 },
                },
                {
                    id: 'bio',
                    name: 'bio',
                    type: 'textarea',
                    label: 'Şəxsi məlumat',
                    placeholder: 'Özün haqqında məlumat',
                    validation: (value) => hasMaxTrimedLength(value, maxDataLength),
                    maxLength: maxDataLength,
                    rows: maxRows,
                    value: (user) => user?.bio || '',
                    grid: { col: 12 },
                }
            ],
            buttons: [
                {
                    type: 'submit',
                    className: 'btn bg-gradient-primary mx-2',
                    disabled: (isLoading) => isLoading,
                    children: (isLoading) => isLoading ? 'Göndərilir...' : 'Göndər',
                },
                {
                    type: 'button',
                    className: 'btn bg-dark text-white',
                    onClick: (onClose) => onClose,
                    children: 'Bağla',
                }
            ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
            submitBody: modes[mode]?.body || null,
        }
    }

    generateUserName(mode, linkId) {
        const modes = {
            add: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/add-userData`,
                method: 'POST',
            },
            update: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/update-userData/${linkId}`,
                method: 'POST',
            },
            delete: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/delete-userData/${linkId}`,
                method: 'DELETE'
            },
        }

        return {
            fields: [
                {
                    id: 'username',
                    name: 'username',
                    type: 'text',
                    label: 'İstifadəçi adı',
                    placeholder: 'İstifadəçi adın',
                    maxLength: usernameMaxLength,
                    value: (user) => user?.username || '',
                    validation: (value) => isNotEmpty(value) && isValidUsername(value) && hasMinLength(value, usernameMinLength) && hasMaxTrimedLength(value, usernameMaxLength),
                    info: `İstifadəçi adı balaca hərflə, minimum ${usernameMinLength}, maksimum ${usernameMaxLength} xarakter olmalı və xüsusi işarələr istifadə olmamalıdır. Nümunə: link, link01, link_01, link.01`,
                    required: true,
                    disabled: (user) => !!user?.username,
                    readOnly: (user) => !!user?.username,
                },
            ],
            buttons: [
                {
                    type: 'submit',
                    className: 'btn bg-gradient-primary mx-2',
                    disabled: (isLoading) => isLoading,
                    children: (isLoading) => isLoading ? 'Göndərilir...' : 'Göndər',
                },
                {
                    type: 'button',
                    className: 'btn bg-dark text-white',
                    onClick: (onClose) => onClose,
                    children: 'Bağla',
                }
            ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
            submitBody: modes[mode]?.body || null,
        }
    }

    generateUserLinks(mode, linkId) {
        const modes = {
            add: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/add-userLinks/${linkId}`,
                method: 'POST',
            },
            update: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/update-userLinks/${linkId}`,
                method: 'POST',
            },
        }

        return {
            fields: [
                {
                    id: 'url',
                    name: 'url',
                    type: 'text',
                    label: 'Linkin adresi',
                    placeholder: 'Adresi',
                    value: (link) => link?.url || '',
                    validation: (value) => isNotEmpty(value) && isValidURL(value),
                    info: 'Link urli mütləqdir ki, http və ya https ilə başlasın. Nümunə: https://linkim.az, http://numune.az',
                    required: true,
                },
                {
                    id: 'title',
                    name: 'title',
                    type: 'text',
                    label: 'Linkin adı',
                    placeholder: 'Adı',
                    maxLength: 30,
                    value: (link) => link?.url || '',
                    validation: (value) => isNotEmpty(value),
                    required: true,
                },
                {
                    id: 'type',
                    name: 'type',
                    type: 'select',
                    label: 'Linkin tipi',
                    value: (link) => link?.type || '',
                    validation: (value) => isNotEmpty(value),
                    required: true,
                    options: [
                        { key: '', value: '', label: 'Seçim edin' },
                        { key: 'sosial', value: 'sosial', label: 'Sosial' },
                        { key: 'sexsi', value: 'şəxsi', label: 'Şəxsi' },
                        { key: 'diger', value: 'digər', label: 'Digər' },
                    ],
                },
                {
                    id: 'active',
                    name: 'active',
                    type: 'select',
                    label: 'Linkin statusu',
                    value: (link) => link?.active.toString() || '',
                    validation: (value) => isNotEmpty(value),
                    required: true,
                    options: [
                        { key: '', value: '', label: 'Seçim edin' },
                        { key: '1', value: 'true', label: 'Aktif' },
                        { key: '0', value: 'false', label: 'Passif' },
                    ],
                },
            ],
            buttons: [
                {
                    type: 'submit',
                    className: 'btn bg-gradient-primary mx-2',
                    disabled: (isLoading) => isLoading,
                    children: (isLoading) => isLoading ? 'Göndərilir...' : 'Göndər',
                },
                {
                    type: 'button',
                    className: 'btn bg-dark text-white',
                    onClick: (onClose) => onClose,
                    children: 'Bağla',
                }
            ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    deleteUserLinks(mode, linkId) {
        const modes = {
            delete: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/delete-userLinks/${linkId}`,
                method: 'DELETE',
            },
        }

        return {
            contents: [
                (data) => <p> Sil düyməsini təsdiqi etdiyin zaman <strong> {data.title} </strong> linkini bir dəfəlik silmiş olacaqsan və bunun geri qayıdışı olmayacaq, daha sonra yenisini yarada bilərsən! </p>
            ],
            buttons: [
                {
                    type: 'submit',
                    className: 'btn bg-gradient-primary mx-2',
                    disabled: (isLoading) => isLoading,
                    children: (isLoading) => isLoading ? 'Göndərilir...' : 'Göndər',
                },
                {
                    type: 'button',
                    className: 'btn bg-dark text-white',
                    onClick: (onClose) => onClose,
                    children: 'Bağla',
                }
            ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }
    
    generateUsernameAvaliability(mode) {
        const modes = {
            find: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_API_ENDPOINT}/check-userName`,
                method: 'POST',
            },
        }

        return {
            fields: [
                {
                    id: 'username',
                    name: 'username',
                    type: 'text',
                    label: 'İstifadəçi adı',
                    placeholder: 'İstifadəçi adı',
                    value: (link) => link?.url || '',
                    validation: (value) => isNotEmpty(value) && isValidUsername(value) && hasMinLength(value, usernameMinLength) && hasMaxTrimedLength(value, usernameMaxLength),
                    info: 'İstifadəçi adı balaca hərflə, minimum 4, maksimum 12 xarakter olmalı və xüsusi işarələr istifadə olmamalıdır. Nümunə: link, link01, link_01, link.01',
                    required: true,
                    grid: { col: 12 },
                },
            ],
            buttons: [
                {
                    type: 'submit',
                    className: 'btn mx-2',
                    disabled: (isLoading) => isLoading,
                    children: (isLoading) => isLoading ? 'Göndərilir...' : 'Göndər',
                }
            ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
            submitBody: modes[mode]?.body || null,
        }
    }

    generateResetPasswordRequest(mode) {
        const modes = {
            add: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_API_ENDPOINT}/reset-password-request`,
                method: 'POST',
            },
        }

        return {
            fields: [
                {
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Email adresin',
                    value: (user) => user?.email || '',
                    validation: (value) => isNotEmpty(value),
                    transform: (value) => value.toLowerCase(),
                    required: true,
                },
            ],
            buttons: [
                {
                    type: 'submit',
                    className: 'btn mx-2',
                    disabled: (isLoading) => isLoading,
                    children: (isLoading) => isLoading ? 'Göndərilir...' : 'Göndər',
                }
            ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
            submitBody: modes[mode]?.body || null,
        }
    }

    generateResetPassword(mode) {
        const modes = {
            update: {
                url: `${this.baseApiUrl}${process.env.REACT_APP_API_ENDPOINT}/reset-password`,
                method: 'POST',
            },
        }

        return {
            fields: [
                {
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Email adresin',
                    value: (user) => user?.email || '',
                    validation: (value) => isNotEmpty(value),
                    transform: (value) => value.toLowerCase(),
                    required: true,
                    disabled: (user) => !!user.email,
                    readOnly: (user) => !!user.email,
                },
                {
                    id: 'password',
                    name: 'password',
                    type: 'password',
                    label: 'Yeni şifrə',
                    placeholder: 'Yeni şifrə',
                    required: true,
                    info: 'Şifrə təhlükəsizliklə bağlı böyük, kiçik hərflər, rəqəm və xüsusi işarələr, minimum 8 xarakter olmalıdır. Nümunə: Link01!!',
                    validation: (value) => hasMinLength(value, 8) && isNotEmpty(value) && isValidPassword(value),
                },
                {
                    id: 'confirmPassword',
                    name: 'confirmPassword',
                    type: 'password',
                    label: 'Yeni şifrənin təkrarı',
                    placeholder: 'Yeni şifrənin təkrarı',
                    required: true,
                    validation: (value, otherValue) => isEqualsToOtherValue(value, otherValue),
                },
            ],
            buttons: [
                {
                    type: 'submit',
                    className: 'btn mx-2',
                    disabled: (isLoading) => isLoading,
                    children: (isLoading) => isLoading ? 'Göndərilir...' : 'Göndər',
                },
            ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
            submitBody: modes[mode]?.body || null,
        }
    }
}