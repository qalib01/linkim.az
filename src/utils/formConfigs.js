import { hasMaxTrimedLength, hasMinLength, isNotEmpty, isValidUsername } from "./validation";

const formConfigs = {
    updateUserData: {
        fields: [
            {
                id: 'username',
                label: 'İstifadəçi adı',
                placeholder: 'İstifadəçi adın',
                type: 'text',
                validation: (value) =>
                    isNotEmpty(value) &&
                    isValidUsername(value) &&
                    hasMinLength(value, 4) &&
                    hasMaxTrimedLength(value, 12),
                info: 'İstifadəçi adı balaca hərflə olmalı və xüsusi işarələr olmamalıdır. min: 4, max: 12 xarakter ola bilər.',
                required: true,
                disabled: (user) => !!user.username,
                readonly: (user) => !!user.username,
            }
        ],
        submitUrl: `${process.env.REACT_APP_API_LINK}/api/user/update-userData`,
        submitMethod: 'POST',
    },
    changePassword: {
        fields: [
            {
                id: 'currentPassword',
                label: 'Cari Şifrə',
                placeholder: 'Cari şifrənizi daxil edin',
                validation: isNotEmpty,
                required: true,
            },
            {
                id: 'newPassword',
                label: 'Yeni Şifrə',
                placeholder: 'Yeni şifrənizi daxil edin',
                validation: (value) => hasMinLength(value, 8),
                required: true,
            },
        ],
        submitUrl: `${process.env.REACT_APP_API_LINK}/api/user/change-password`,
        submitMethod: 'POST',
    },
};

export default formConfigs;