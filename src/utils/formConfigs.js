import { closeButton, contactFullName, contactMessage, contactSubject, coverColorButton, coverPhotoButton, faqAnswer, faqButton, faqGroup, faqGroupButton, faqQuestion, order, status, submitButton, userBio, userConfirmPassword, userCoverColor, userCoverPhoto, userEmail, userLinkTitle, userLinkType, userLinkUrl, userLoginPassword, userName, userPassword, userProfilePhoto, userSurname, userUsername } from "./formElements";
import { ROUTES } from "./routes";

export class ConfigGenerator {
    constructor(baseApiUrl) { this.baseApiUrl = baseApiUrl || `${process.env.REACT_APP_API_LINK}` }

    // ! User Login Form Configs
    userLogin(mode) {
        const modes = {
            add: { url: `${this.baseApiUrl}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.LOGIN}`, method: 'POST' },
        }

        return {
            fields: [userEmail(), userLoginPassword()],
            buttons: [submitButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    // ! 
    generateUserData(mode, id) {
        const modes = {
            add: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.ADD_USER}`, method: 'POST' },
            update: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.UPDATE_USER_BY_ID}${id}`, method: 'POST' },
        }

        return {
            fields: [userName({ grid: { col: 6 } }), userSurname({ grid: { col: 6 } }), userEmail({ grid: { col: 6 } }), userUsername({ grid: { col: 6 } }), userPassword({ grid: { col: 6 } }), userConfirmPassword({ grid: { col: 6 } }), userBio()],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    deleteUserData(mode, id) {
        const modes = { delete: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.DELETE_USER_BY_ID}${id}`, method: 'DELETE' }, }

        return {
            contents: [(data) => <p> Sil düyməsini təsdiqi etdiyin zaman <strong> {data.name} {data.surname} </strong> istifadəçisini bir dəfəlik silmiş olacaqsan və bunun geri qayıdışı olmayacaq, daha sonra yenisini yarada bilərsən! </p>],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserPhoto(mode, id) {
        const modes = {
            update: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.UPLOAD_USER_PHOTO_BY_ID}${id}`, method: 'POST' },
        }

        return {
            fields: [userProfilePhoto()],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    chooseUserCoverOption(mode) {
        const modes = {}

        return {
            contents: [() => <p> Zəhmət olmasa, yaratmaq istədiyin formu aşağıdan seçim edərək davam edəsən! </p>],
            fields: [coverPhotoButton({ grid: { col: 6 }, config: 'photo' }), coverColorButton({ grid: { col: 6 }, config: 'color' })],
            buttons: [closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserCoverData(mode, id) {
        const modes = {
            photo: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.UPLOAD_USER_COVER_BY_ID}${id}`, method: 'POST' },
            color: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.UPLOAD_USER_COVER_BY_ID}${id}`, method: 'POST' },
        }

        const fields = {
            photo: [userCoverPhoto()],
            color: [userCoverColor()],
        }

        return {
            fields: fields[mode],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserName(mode, id) {
        const modes = {
            add: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.ADD_USER_DATA_BY_ID}`, method: 'POST' },
            update: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.UPDATE_USER_DATA_BY_ID}${id}`, method: 'POST' },
            delete: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.DELETE_USER_DATA_BY_ID}${id}`, method: 'DELETE' },
        }

        return {
            fields: [userUsername()],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateSubscribe(mode) {
        const modes = {
            add: { url: `${this.baseApiUrl}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.SUBSCRIBE}`, method: 'POST' },
        }

        return {
            fields: [userEmail()],
            buttons: [submitButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserSubscription(mode, id) {
        const modes = { add: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.ACTIVATE_SUBSCRIPTION_BY_ID}${id}`, method: 'post' } }

        return {
            contents: [() => <p> Göndər düyməsini təsdiqi etdiyin zaman sistem abunəçiliyini qəbul etmiş olursan və növbəti mərhələdə seçdiyin abunəliklərə əsasən emaillər göndəriləcək! </p>],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserLinks(mode, id) {
        const modes = {
            add: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.ADD_USER_LINK_BY_USER_ID}${id}`, method: 'POST' },
            update: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.UPDATE_USER_LINK_BY_ID}${id}`, method: 'POST' },
        }

        return {
            fields: [userLinkUrl(), userLinkTitle(), userLinkType(), status()],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    deleteUserLinks(mode, id) {
        const modes = {
            delete: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.DELETE_USER_LINK_BY_ID}${id}`, method: 'DELETE' },
        }

        return {
            contents: [
                (data) => <p> Sil düyməsini təsdiqi etdiyin zaman <strong> {data.title} </strong> linkini bir dəfəlik silmiş olacaqsan və bunun geri qayıdışı olmayacaq, daha sonra yenisini yarada bilərsən! </p>
            ],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUsernameAvaliability(mode) {
        const modes = {
            find: { url: `${this.baseApiUrl}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.CHECK_USERNAME}`, method: 'POST' },
        }

        return {
            fields: [userUsername()],
            buttons: [submitButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateResetPasswordRequest(mode) {
        const modes = {
            add: { url: `${this.baseApiUrl}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.RESET_PASSWORD_REQUEST}`, method: 'POST' },
        }

        return {
            fields: [userEmail()],
            buttons: [submitButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateResetPassword(mode) {
        const modes = {
            update: { url: `${this.baseApiUrl}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.RESET_PASSWORD}`, method: 'POST' },
        }

        return {
            fields: [userEmail(), userPassword(), userConfirmPassword()],
            buttons: [submitButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    editUserStatus(mode, id) {
        const modes = {
            update: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.ACTIVATE_USER_BY_ID}${id}`, method: 'POST' },
        }

        return {
            contents: [
                (data) => <p> Göndər düyməsini təsdiqi etdiyin zaman <strong> {data.name} {data.surname} </strong> adlı istifadəçini aktif etmiş olacaqsan və bunun qayıdışı yoxdur. Zəhmət olmasa, dəqiqləşdirib elə aktif edəsən! </p>
            ],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    chooseTvsOption(mode) {
        const modes = {}

        return {
            contents: [() => <p> Zəhmət olmasa, yaratmaq istədiyin formu aşağıdan seçim edərək davam edəsən! </p>],
            fields: [faqButton({ grid: { col: 6 }, config: 'faq' }), faqGroupButton({ grid: { col: 6 }, config: 'group' })],
            buttons: [closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateTvsData(mode) {
        const modes = {
            faq: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.ADD_FAQ}`, method: 'POST' },
            group: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.ADD_FAQ_GROUP}`, method: 'POST' },
        }

        const fields = {
            faq: [faqQuestion(), faqAnswer(), faqGroup(), status(), order()],
            group: [faqGroup(), status(), order()],
        }

        return {
            fields: fields[mode],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    editTvsData(mode, id) {
        const modes = {
            faq: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.UPDATE_FAQ_BY_ID}${id}`, method: 'POST' },
            group: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.UPDATE_FAQ_GROUP_BY_ID}${id}`, method: 'POST' },
        }

        const fields = {
            faq: [faqQuestion(), faqAnswer(), faqGroup(), status(), order()],
            group: [faqGroup(), status(), order()],
        }

        return {
            fields: fields[mode],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    deleteTvsData(mode, id) {
        const modes = {
            group: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.DELETE_FAQ_BY_ID}${id}`, method: 'DELETE' },
            faq: { url: `${this.baseApiUrl}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.DELETE_FAQ_GROUP_BY_ID}${id}`, method: 'DELETE' },
        }

        return {
            contents: [
                (data) => <p> Sil düyməsini təsdiqi etdiyin zaman <strong> {mode === 'faq' ? data.question : data.group} </strong> məlumatını bir dəfəlik silmiş olacaqsan və bunun geri qayıdışı olmayacaq, daha sonra yenisini yarada bilərsən! </p>
            ],
            buttons: [submitButton(), closeButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    // ! User Contact Form Configs
    generateContactMessage(mode) {
        const modes = {
            send: { url: `${this.baseApiUrl}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.CONTACT}`, method: 'post' },
        }

        return {
            fields: [
                contactFullName(),
                userEmail(),
                contactSubject(),
                contactMessage(),
            ],
            buttons: [submitButton()],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }
}