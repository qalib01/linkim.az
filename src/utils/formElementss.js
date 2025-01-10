import { hasMaxTrimedLength, hasMinLength, isEqualsToOtherValue, isNotEmpty, isValidEmail, isValidPassword, isValidURL, isValidUsername } from "./validation";
const maxDataLength = 300;
const maxRows = 3;
const usernameMinLength = 3;
const usernameMaxLength = 12;


// Configuration for GlobalDataManagement
const status = () => {
    return {
        id: 'active',
        name: 'active',
        type: 'select',
        label: 'Statusu',
        value: (data) => data?.active?.toString() || '',
        validation: (data) => isNotEmpty(data),
        required: true,
        options: [
            { key: '', value: '', label: 'Seçim edin' },
            { key: '1', value: 'true', label: 'Aktif' },
            { key: '0', value: 'false', label: 'Passif' },
        ],
    }
}

const order = () => {
    return {
        id: 'order',
        name: 'order',
        type: 'number',
        label: 'Sırası',
        value: (data) => data?.order || '',
        validation: (data) => isNotEmpty(data),
        required: true,
    }
}




// Configuration for UserDataManagement
const userName = () => {
    return {
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
    };
}

const userSurname = () => {
    return {
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
    };
}

const userEmail = () => {
    return {
        id: 'email',
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Email adresin',
        value: (user) => user?.email || '',
        validation: (value) => isNotEmpty(value),
        transform: (value) => value.toLowerCase(),
        required: true,
        disabled: (user) => !!user?.email,
        readOnly: (user) => !!user?.email,
        grid: { col: 6 },
    };
}

const userUsername = () => {
    return {
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
        grid: { col: 6 },
    };
}

const userPassword = () => {
    return {
        id: 'password',
        name: 'password',
        type: 'password',
        label: 'Yeni şifrə',
        placeholder: 'Yeni şifrə',
        info: 'Şifrə təhlükəsizliklə bağlı böyük, kiçik hərflər, rəqəm və xüsusi işarələr, minimum 8 xarakter olmalıdır. Nümunə: Link01!!',
        validation: (value) => hasMinLength(value, 8) && isNotEmpty(value) && isValidPassword(value),
        grid: { col: 6 },
    };
}

const userConfirmPassword = () => {
    return {
        id: 'password',
        name: 'password',
        type: 'password',
        label: 'Yeni şifrə',
        placeholder: 'Yeni şifrə',
        info: 'Şifrə təhlükəsizliklə bağlı böyük, kiçik hərflər, rəqəm və xüsusi işarələr, minimum 8 xarakter olmalıdır. Nümunə: Link01!!',
        validation: (value) => hasMinLength(value, 8) && isNotEmpty(value) && isValidPassword(value),
        grid: { col: 6 },
    };
}

const userBio = () => {
    return {
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
    };
}

const userProfilePhoto = () => {
    return {
        id: 'profilePhoto',
        name: 'profilePhoto',
        label: 'Profil şəkili',
        type: 'file',
        validation: (data) => data,
        accept: 'image/png, image/jpeg, image/jpg',
        required: true,
    };
}




// Configuration for UserLinkManagement
const userLinkUrl = () => {
    return {
        id: 'url',
        name: 'url',
        type: 'text',
        label: 'Linkin adresi',
        placeholder: 'Adresi',
        value: (data) => data?.url || '',
        validation: (data) => isNotEmpty(data) && isValidURL(data),
        info: 'Link urli mütləqdir ki, http və ya https ilə başlasın. Nümunə: https://linkim.az, http://numune.az',
        required: true,
    };
}

const userLinkTitle = () => {
    return {
        id: 'title',
        name: 'title',
        type: 'text',
        label: 'Linkin adı',
        placeholder: 'Adı',
        maxLength: 30,
        value: (data) => data?.url || '',
        validation: (data) => isNotEmpty(data),
        required: true,
    };
}

const userLinkType = () => {
    return {
        id: 'type',
        name: 'type',
        type: 'select',
        label: 'Linkin tipi',
        value: (data) => data?.type || '',
        validation: (data) => isNotEmpty(data),
        required: true,
        options: [
            { key: '', value: '', label: 'Seçim edin' },
            { key: 'sosial', value: 'sosial', label: 'Sosial' },
            { key: 'sexsi', value: 'şəxsi', label: 'Şəxsi' },
            { key: 'diger', value: 'digər', label: 'Digər' },
        ],
    };
}




// Configuration for FaqManagement
const faqQuestion = () => {
    return {
        id: 'question',
        name: 'question',
        type: 'text',
        label: 'Sual',
        placeholder: 'Sual',
        value: (data) => data?.question || '',
        validation: (data) => isNotEmpty(data),
        required: true,
    };
}

const faqAnswer = () => {
    return {
        id: 'answer',
        name: 'answer',
        type: 'textarea',
        label: 'Cavab',
        placeholder: 'Cavab',
        value: (data) => data?.answer || '',
        validation: (data) => isNotEmpty(data),
        required: true,
    };
}

const faqGroup = () => {
    return                 {
        id: 'group',
        name: 'group',
        type: 'text',
        label: 'Qrup adı',
        placeholder: 'Qrup adı',
        value: (data) => data?.group || '',
        validation: (data) => isNotEmpty(data),
        required: true,
    };
}

