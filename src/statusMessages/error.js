const type = 'error';

const errorMessages = {
    TOKEN_CANNOT_GET: { type, message: 'Token etibarsızdır!' },
    ALL_FIELDS_REQUIRED: { type, message: 'Xahiş olunur bütün sahələri düzgün doldurun!' },
    PASSWORDS_MUST_BE_SAME: { type, message: 'Şifrələr eyni olmalıdır!' },
    CHANGES_NOT_FOUND: { type, message: 'Yenilənəcək məlumat tapılmadı!' },
    GENERAL_ERROR: { type, message: 'Texniki xəta baş verdi. Xahiş olunur daha sonra yenidən yoxlayın!' },
    USER_UP_TO_LINK_LIMIT: { type, message: 'Siz maksimal link sayı limitinə çatıbsınız!' },
};

module.exports = errorMessages;