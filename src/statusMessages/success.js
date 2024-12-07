const type = 'success';

const successMessages = {
    PASSWORD_CHANGED: { type, message: 'Şifrə uğurla yeniləndi!' },
    USERNAME_CHANGED: { type, message: 'İstifadəçi adı yeniləndi!' },
    PASSWORD_CHANGE_REQUEST_HAS_SENT: { type, message: 'Şifrə yenilənmə linki email hesabına göndərildi!' },
    REGISTRATION_SUCCESSFUL: { type, message: 'Qeydiyyat uğurlu oldu. Emailə göndərilən təsdiq linkinə keçid edərək hesabı aktifləşdirin!'},
    USER_ACTIVATED: { type, message: 'Hesabın uğurla aktifləşdirildi. İstifadəçi panelinə daxil ola bilərsən!' },
    RESEND_USER_ACTIVATE_REQUEST_HAS_SENT: { type, message: 'Yeni aktiləşdirmə linki email hesabına uğurla göndərildi. Hesabına keçərək təsdiq edə bilərsən!' },
    CONTACT_MESSAGE_SENT: { type, message: 'Mesaj uğurla göndərildi. Təşəkkür edirik, tezliklə əlaqə saxlayacağıq!' },
    PHOTO_CHANGED_SUCCESSFULLY: { type, message: 'Profil şəkili uğurla yeniləndi!' },
    RECORDS_ADDED: { type, message: 'Məlumatlar uğurla əlavə edildi!' },
    RECORDS_UPDATED: { type, message: 'Məlumatlar uğurla yeniləndi!' },
    RECORDS_DELETED: { type, message: 'Məlumatlar uğurla silindi!' },
};

module.exports = successMessages;