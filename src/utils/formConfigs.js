import { hasMaxTrimedLength, hasMinLength, isEqualsToOtherValue, isNotEmpty, isValidPassword, isValidURL, isValidUsername } from "./validation";
const maxDataLength = 300;

const formConfigs = {
    updateUserData: {
        fields: [
            {
                id: 'name',
                name: 'name',
                type: 'text',
                label: 'Adın',
                placeholder: 'Adın',
                value: (user) => user?.name || '',
                validation: (value) => isNotEmpty(value),
                required: true,
            },
            {
                id: 'surname',
                name: 'surname',
                type: 'text',
                label: 'Soyadın',
                placeholder: 'Soyadın',
                value: (user) => user?.surname || '',
                validation: (value) => isNotEmpty(value),
                required: true,
            },
            {
                id: 'email',
                name: 'email',
                type: 'email',
                label: 'Emailin',
                value: (user) => user?.email || '',
                validation: (value) => isNotEmpty(value),
                transform: (value) => value.toLowerCase(),
                required: true,
                disabled: (user) => !!user.username,
                readonly: (user) => !!user.username,
            },
            {
                id: 'username',
                name: 'username',
                type: 'text',
                label: 'İstifadəçi adı',
                placeholder: 'İstifadəçi adın',
                value: (user) => user?.username || '',
                validation: (value) => isNotEmpty(value) && isValidUsername(value) && hasMinLength(value, 4) && hasMaxTrimedLength(value, 12),
                info: (user) => user?.username ? '' : 'İstifadəçi adı balaca hərflə olmalı və xüsusi işarələr olmamalıdır. min: 4, max: 12 xarakter ola bilər. Nümunə: link, link01, link_01',
                required: true,
                disabled: (user) => !!user?.username,
                readonly: (user) => !!user?.username,
            },
            {
                id: 'password',
                name: 'password',
                type: 'password',
                label: 'Yeni şifrə',
                placeholder: 'Yeni şifrə',
                validation: (value) => hasMinLength(value, 8) && isNotEmpty(value) && isValidPassword(value),
                required: true,
            },
            {
                id: 'confirmPassword',
                name: 'confirmPassword',
                type: 'password',
                label: 'Yeni şifrənin təkrarı',
                placeholder: 'Yeni şifrənin təkrarı',
                validation: (value, formData) => isEqualsToOtherValue(value, formData.password),
                required: true,
            },
            {
                id: 'bio',
                name: 'bio',
                type: 'text',
                label: 'Şəxsi məlumat',
                placeholder: 'Özün haqqında məlumat',
                validation: (value) => isNotEmpty(value) && hasMaxTrimedLength(value, maxDataLength),
                required: true,
            },
        ],
        submitUrl: `${process.env.REACT_APP_API_LINK}/api/user/update-userData`,
        submitMethod: 'POST',
    },
    updateUserName: {
        fields: [
            {
                id: 'username',
                name: 'username',
                type: 'text',
                label: 'İstifadəçi adı',
                placeholder: 'İstifadəçi adın',
                value: (user) => user?.username || '',
                validation: (value) => isNotEmpty(value) && isValidUsername(value) && hasMinLength(value, 4) && hasMaxTrimedLength(value, 12),
                info: 'İstifadəçi adı balaca hərflə olmalı və xüsusi işarələr olmamalıdır. min: 4, max: 12 xarakter ola bilər. Nümunə: link, link01, link_01',
                required: true,
                disabled: (user) => !!user?.username,
                readonly: (user) => !!user?.username,
            }
        ],
        submitUrl: `${process.env.REACT_APP_API_LINK}/api/user/update-userData`,
        submitMethod: 'POST',
    },
    userLinkAdd: {
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
                id: 'is_active',
                name: 'is_active',
                type: 'select',
                label: 'Linkin statusu',
                value: (link) => link?.is_active || '',
                validation: (value) => isNotEmpty(value),
                required: true,
                options: [
                    { key: '', value: '', label: 'Seçim edin' },
                    { key: '1', value: true, label: 'Aktif' },
                    { key: '0', value: false, label: 'Passif' },
                ],
            },
        ],
        submitUrl: `${process.env.REACT_APP_API_LINK}/api/user/add-userLinks`,
        submitMethod: 'POST',
    },
    userLinkUpdate: {
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
                id: 'is_active',
                name: 'is_active',
                type: 'select',
                label: 'Linkin statusu',
                value: (link) => link?.is_active || '',
                validation: (value) => isNotEmpty(value),
                required: true,
                options: [
                    { key: '', value: '', label: 'Seçim edin' },
                    { key: '1', value: true, label: 'Aktif' },
                    { key: '0', value: false, label: 'Passif' },
                ],
            },
        ],
        submitUrl: `${process.env.REACT_APP_API_LINK}/api/user/update-userLinks`,
        submitMethod: 'POST',
    },
};


export class ConfigGenerator {
    constructor(baseApiUrl) {
        this.baseApiUrl = baseApiUrl || `${process.env.REACT_APP_API_LINK}/api/user`
    }

    generateUserData(mode, linkId) {
        const modes = {
            add: {
                url: `${this.baseApiUrl}/add-userData`,
                method: 'POST',
            },
            update: {
                url: `${this.baseApiUrl}/update-userData/${linkId}`,
                method: 'POST',
            },
            delete: {
                url: `${this.baseApiUrl}/delete-userData/${linkId}`,
                method: 'DELETE'
            },
        }

        return {
            fields: [
                {
                    id: 'name',
                    name: 'name',
                    type: 'text',
                    label: 'Adın',
                    placeholder: 'Adın',
                    value: (user) => user?.name || '',
                    validation: (value) => isNotEmpty(value),
                    required: true,
                },
                {
                    id: 'surname',
                    name: 'surname',
                    type: 'text',
                    label: 'Soyadın',
                    placeholder: 'Soyadın',
                    value: (user) => user?.surname || '',
                    validation: (value) => isNotEmpty(value),
                    required: true,
                },
                {
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    label: 'Emailin',
                    value: (user) => user?.email || '',
                    validation: (value) => isNotEmpty(value),
                    transform: (value) => value.toLowerCase(),
                    required: true,
                    disabled: (user) => !!user.username,
                    readonly: (user) => !!user.username,
                },
                {
                    id: 'username',
                    name: 'username',
                    type: 'text',
                    label: 'İstifadəçi adı',
                    placeholder: 'İstifadəçi adın',
                    value: (user) => user?.username || '',
                    validation: (value) => isNotEmpty(value) && isValidUsername(value) && hasMinLength(value, 4) && hasMaxTrimedLength(value, 12),
                    info: (user) => user?.username ? '' : 'İstifadəçi adı balaca hərflə olmalı və xüsusi işarələr olmamalıdır. min: 4, max: 12 xarakter ola bilər. Nümunə: link, link01, link_01',
                    required: true,
                    disabled: (user) => !!user?.username,
                    readonly: (user) => !!user?.username,
                },
                {
                    id: 'password',
                    name: 'password',
                    type: 'password',
                    label: 'Yeni şifrə',
                    placeholder: 'Yeni şifrə',
                    validation: (value) => hasMinLength(value, 8) && isNotEmpty(value) && isValidPassword(value),
                    required: true,
                },
                {
                    id: 'confirmPassword',
                    name: 'confirmPassword',
                    type: 'password',
                    label: 'Yeni şifrənin təkrarı',
                    placeholder: 'Yeni şifrənin təkrarı',
                    validation: (value, formData) => isEqualsToOtherValue(value, formData.password),
                    required: true,
                },
                {
                    id: 'bio',
                    name: 'bio',
                    type: 'text',
                    label: 'Şəxsi məlumat',
                    placeholder: 'Özün haqqında məlumat',
                    validation: (value) => isNotEmpty(value) && hasMaxTrimedLength(value, maxDataLength),
                    required: true,
                }
            ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserName(mode, linkId) {
        const modes = {
            add: {
                url: `${this.baseApiUrl}/add-userData`,
                method: 'POST',
            },
            update: {
                url: `${this.baseApiUrl}/update-userData/${linkId}`,
                method: 'POST',
            },
            delete: {
                url: `${this.baseApiUrl}/delete-userData/${linkId}`,
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
                    value: (user) => user?.username || '',
                    validation: (value) => isNotEmpty(value) && isValidUsername(value) && hasMinLength(value, 4) && hasMaxTrimedLength(value, 12),
                    info: 'İstifadəçi adı balaca hərflə olmalı və xüsusi işarələr olmamalıdır. min: 4, max: 12 xarakter ola bilər. Nümunə: link, link01, link_01',
                    required: true,
                    disabled: (user) => !!user?.username,
                    readonly: (user) => !!user?.username,
                }
            ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserLinks(mode, linkId) {
        const modes = {
            add: {
                url: `${this.baseApiUrl}/add-userLinks/${linkId}`,
                method: 'POST',
            },
            update: {
                url: `${this.baseApiUrl}/update-userLinks/${linkId}`,
                method: 'POST',
            },
            delete: {
                url: `${this.baseApiUrl}/delete-userLinks/${linkId}`,
                method: 'DELETE'
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
                    id: 'is_active',
                    name: 'is_active',
                    type: 'select',
                    label: 'Linkin statusu',
                    value: (link) => link?.is_active || '',
                    validation: (value) => isNotEmpty(value),
                    required: true,
                    options: [
                        { key: '', value: '', label: 'Seçim edin' },
                        { key: '1', value: true, label: 'Aktif' },
                        { key: '0', value: false, label: 'Passif' },
                    ],
                },
            ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }
}

export default formConfigs;