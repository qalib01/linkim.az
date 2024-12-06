import { hasMaxTrimedLength, hasMinLength, isEqualsToOtherValue, isNotEmpty, isValidPassword, isValidUsername } from "./validation";
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
                info: (user) => user?.username ? '' : 'İstifadəçi adı balaca hərflə olmalı və xüsusi işarələr olmamalıdır. min: 4, max: 12 xarakter ola bilər. Nümunə: link, link01, link_01',
                required: true,
                disabled: (user) => !!user?.username,
                readonly: (user) => !!user?.username,
            }
        ],
        submitUrl: `${process.env.REACT_APP_API_LINK}/api/user/update-userData`,
        submitMethod: 'POST',
    },
};

export default formConfigs;