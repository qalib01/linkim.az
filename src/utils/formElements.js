import { hasMaxTrimedLength, hasMinLength, isEqualsToOtherValue, isNotEmpty, isValidEmail, isValidPassword, isValidURL, isValidUsername } from "./validation";
const maxDataLength = 300;
const maxRows = 3;
const usernameMinLength = 3;
const usernameMaxLength = 12;


// Configuration for GlobalDataManagement
const status = (props) => {
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
        ...props,
    }
}

const order = (props) => {
    return {
        id: 'order',
        name: 'order',
        type: 'number',
        label: 'Sırası',
        value: (data) => data?.order || '',
        validation: (data) => isNotEmpty(data),
        required: true,
        ...props,
    }
}




// Configuration for UserDataManagement
const userName = (props) => {
    return {
        id: 'name',
        name: 'name',
        type: 'text',
        label: 'Ad',
        maxLength: 20,
        placeholder: 'Adın',
        value: (data) => data?.name || '',
        validation: (data) => isNotEmpty(data),
        required: true,
        ...props,
    };
}

const userSurname = (props) => {
    return {
        id: 'surname',
        name: 'surname',
        type: 'text',
        label: 'Soyad',
        maxLength: 20,
        placeholder: 'Soyadın',
        value: (data) => data?.surname || '',
        validation: (data) => isNotEmpty(data),
        required: true,
        ...props,
    };
}

const userEmail = (props) => {
    return {
        id: 'email',
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Email adresin',
        value: (data) => data?.email || '',
        validation: (data) => isNotEmpty(data) && isValidEmail(data),
        transform: (data) => data.toLowerCase(),
        required: true,
        disabled: (data) => !!data?.email,
        readOnly: (data) => !!data?.email,
        ...props,
    };
}

const userUsername = (props) => {
    return {
        id: 'username',
        name: 'username',
        type: 'text',
        label: 'İstifadəçi adı',
        placeholder: 'İstifadəçi adın',
        maxLength: usernameMaxLength,
        value: (data) => data?.username || '',
        validation: (data) => isNotEmpty(data) && isValidUsername(data) && hasMinLength(data, usernameMinLength) && hasMaxTrimedLength(data, usernameMaxLength),
        info: `İstifadəçi adı balaca hərflə, minimum ${usernameMinLength}, maksimum ${usernameMaxLength} xarakter olmalı və xüsusi işarələr istifadə olmamalıdır. Nümunə: link, link01, link_01, link.01`,
        required: true,
        disabled: (data) => !!data?.username,
        readOnly: (data) => !!data?.username,
        ...props,
    };
}

const userPassword = (props) => {
    return {
        id: 'password',
        name: 'password',
        type: 'password',
        label: 'Yeni şifrə',
        placeholder: 'Yeni şifrə',
        info: 'Şifrə təhlükəsizliklə bağlı böyük, kiçik hərflər, rəqəm və xüsusi işarələr, minimum 8 xarakter olmalıdır. Nümunə: Link01!!',
        validation: (data) => hasMinLength(data, 8) && isNotEmpty(data) && isValidPassword(data),
        ...props,
    };
}

const userConfirmPassword = (props) => {
    return {
        id: 'confirmPassword',
        name: 'confirmPassword',
        type: 'password',
        label: 'Yeni şifrə',
        placeholder: 'Yeni şifrə',
        info: 'Şifrə təhlükəsizliklə bağlı böyük, kiçik hərflər, rəqəm və xüsusi işarələr, minimum 8 xarakter olmalıdır. Nümunə: Link01!!',
        validation: (data, otherValue) => isEqualsToOtherValue(data, otherValue),
        ...props,
    };
}

const userBio = (props) => {
    return {
        id: 'bio',
        name: 'bio',
        type: 'textarea',
        label: 'Şəxsi məlumat',
        placeholder: 'Özün haqqında məlumat',
        validation: (data) => hasMaxTrimedLength(data, maxDataLength),
        maxLength: maxDataLength,
        rows: maxRows,
        value: (data) => data?.bio || '',
        ...props,
    };
}

const userProfilePhoto = (props) => {
    return {
        id: 'profilePhoto',
        name: 'profilePhoto',
        label: 'Profil şəkili',
        type: 'file',
        validation: (data) => data,
        accept: 'image/png, image/jpeg, image/jpg',
        required: true,
        ...props,
    };
}

const userLoginPassword = (props) => {
    return {
        id: 'password',
        name: 'password',
        type: 'password',
        label: 'Şifrə',
        placeholder: 'Şifrə',
        validation: (data) => hasMinLength(data, 8) && isNotEmpty(data) && isValidPassword(data),
        ...props,
    };
}




// Configuration for UserLinkManagement
const userLinkUrl = (props) => {
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
        ...props,
    };
}

const userLinkTitle = (props) => {
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
        ...props,
    };
}

const userLinkType = (props) => {
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
        ...props,
    };
}




// Configuration for FaqManagement
const faqQuestion = (props) => {
    return {
        id: 'question',
        name: 'question',
        type: 'text',
        label: 'Sual',
        placeholder: 'Sual',
        value: (data) => data?.question || '',
        validation: (data) => isNotEmpty(data),
        required: true,
        ...props,
    };
}

const faqAnswer = (props) => {
    return {
        id: 'answer',
        name: 'answer',
        type: 'textarea',
        label: 'Cavab',
        placeholder: 'Cavab',
        value: (data) => data?.answer || '',
        validation: (data) => isNotEmpty(data),
        required: true,
        ...props,
    };
}

const faqGroup = (props) => {
    return {
        id: 'group',
        name: 'group',
        type: 'text',
        label: 'Qrup adı',
        placeholder: 'Qrup adı',
        value: (data) => data?.group || '',
        validation: (data) => isNotEmpty(data),
        required: true,
        ...props,
    };
}

const faqButton = (props) => {
    return {
        id: 'faq',
        name: 'faq',
        type: 'button',
        label: 'TVS yarat',
        asButton: true,
        value: () => '',
        validation: (data) => data,
        required: true,
        classList: 'w-100',
        ...props,
    };
}

const faqGroupButton = (props) => {
    return {
        id: 'group',
        name: 'group',
        type: 'button',
        label: 'TVS Qrupu yarat',
        asButton: true,
        value: () => '',
        validation: (data) => data,
        required: true,
        classList: 'w-100',
        ...props,
    };
}




// Configuration for ContactManagement
const contactFullName = (props) => {
    return {
        id: 'fullName',
        name: 'fullName',
        type: 'text',
        label: 'Tam ad',
        placeholder: 'Tam ad',
        value: (data) => data.fullName || '',
        validation: (data) => isNotEmpty(data),
        disabled: (data) => data && true,
        required: true,
        ...props,
    };
}

const contactSubject = (props) => {
    return {
        id: 'subject',
        name: 'subject',
        type: 'text',
        label: 'Mövzu',
        placeholder: 'Mövzu',
        value: (data) => data?.subject || '',
        validation: (data) => isNotEmpty(data),
        required: true,
        ...props,
    };
}

const contactMessage = (props) => {
    return {
        id: 'message',
        name: 'message',
        type: 'textarea',
        label: 'Mesaj',
        placeholder: 'Mesaj',
        value: (data) => data?.message || '',
        validation: (data) => isNotEmpty(data),
        required: true,
        rows: maxRows,
        ...props,
    };
}




// Configuration for ButtonManagement
const submitButton = (props) => {
    return {
        type: 'submit',
        className: 'btn bg-gradient-primary mx-2',
        disabled: (isLoading) => isLoading,
        children: (isLoading) => isLoading ? 'Göndərilir...' : 'Göndər',
        ...props,
    };
}

const closeButton = (props) => {
    return {
        type: 'button',
        className: 'btn bg-dark text-white',
        onClick: (onClose) => onClose,
        children: 'Bağla',
        ...props,
    };
}








export { status, order, userName, userSurname, userEmail, userUsername, userPassword, userConfirmPassword, userBio, userProfilePhoto, userLoginPassword, userLinkUrl, userLinkTitle, userLinkType, faqQuestion, faqAnswer, faqGroup, faqButton, faqGroupButton, contactFullName, contactSubject, contactMessage, submitButton, closeButton }