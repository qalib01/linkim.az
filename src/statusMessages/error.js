const type = 'error';

const errorMessages = {
    CHANGES_NOT_FOUND: { type, message: 'Yenilənəcək hər hansı məlumat tapılmadı!' },
    GENERAL_ERROR: { type, message: 'Texniki xəta baş verdi. Xahiş olunur daha sonra yenidən yoxlayın!' },
    USER_UP_TO_LINK_LIMIT: { type, message: 'Siz maksimal link sayı limitinə çatıbsınız!' },
    ALL_FIELDS_REQUIRED: { type, message: 'Bütün xanaların düzgün doldurulması tələb olunur!' },
    PASSWORDS_MUST_BE_SAME: { type, message: 'Şifrələr eyni olmalıdır!' }
};

module.exports = errorMessages;