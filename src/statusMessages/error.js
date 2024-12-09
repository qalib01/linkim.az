const type = 'error';

const errorMessages = {
    CHANGES_NOT_FOUND: { type, message: 'Yenilənəcək məlumat tapılmadı!' },
    GENERAL_ERROR: { type, message: 'Texniki xəta baş verdi. Xahiş olunur daha sonra yenidən yoxlayın!' },
    USER_UP_TO_LINK_LIMIT: { type, message: 'Siz maksimal link sayı limitinə çatıbsınız!' },
};

module.exports = errorMessages;