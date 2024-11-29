const type = 'error';

const errorMessages = {
    TOKEN_CANNOT_GET: { type, message: 'Token etibarsızdır!' },
    ALL_FIELDS_REQUIRED: { type, message: 'Bütün xanalar düzgün doldurulmalıdır!' },
    PASSWORDS_MUST_BE_SAME: { type, message: 'Şifrələr eyni olmalıdır!' },
    CHANGES_NOT_FOUND: { type, message: 'Yenilənəcək məlumat tapılmadı!' },
    GENERAL_ERROR: { type, message: 'Texniki xəta baş verdi. Xahiş olunur ki, daha sonra yenidən yoxlayasınız!' },
};

module.exports = errorMessages;