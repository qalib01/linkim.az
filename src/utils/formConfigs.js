import { closeButton, contactFullName, contactMessage, contactSubject, faqAnswer, faqButton, faqGroup, faqGroupButton, faqQuestion, order, status, submitButton, userBio, userConfirmPassword, userEmail, userLinkTitle, userLinkType, userLinkUrl, userLoginPassword, userName, userPassword, userProfilePhoto, userSurname, userUsername } from "./formElements";

export class ConfigGenerator {
    constructor(baseApiUrl) {
        this.baseApiUrl = baseApiUrl || `${process.env.REACT_APP_API_LINK}`
    }

    generateUserData(mode, id) {
        const modes = {
            add: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/add-userData`, method: 'POST' },
            update: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/update-userData/${id}`, method: 'POST' },
            delete: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/delete-userData/${id}`, method: 'DELETE' },
        }

        return {
            fields: [ userName({grid: { col: 6 }}), userSurname({grid: { col: 6 }}), userEmail({grid: { col: 6 }}), userUsername({grid: { col: 6 }}), userPassword({grid: { col: 6 }}), userConfirmPassword({grid: { col: 6 }}), userBio() ],
            buttons: [ submitButton(), closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    userLogin(mode) {
        const modes = {
            add: { url: `${this.baseApiUrl}${process.env.REACT_APP_API_ENDPOINT}/login`, method: 'POST' },
        }

        return {
            fields: [ userEmail(), userLoginPassword() ],
            buttons: [ submitButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserPhoto(mode, id) {
        const modes = {
            update: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/upload-userPhoto/${id}`, method: 'POST' },
        }

        return {
            fields: [ userProfilePhoto() ],
            buttons: [ submitButton(), closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserName(mode, id) {
        const modes = {
            add: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/add-userData`, method: 'POST' },
            update: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/update-userData/${id}`, method: 'POST' },
            delete: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/delete-userData/${id}`, method: 'DELETE' },
        }

        return {
            fields: [ userUsername() ],
            buttons: [ submitButton(), closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateSubscribe(mode) {
        const modes = {
            add: { url: `${this.baseApiUrl}${process.env.REACT_APP_API_ENDPOINT}/subscribe`, method: 'POST' },
        }

        return {
            fields: [ userEmail() ],
            buttons: [ submitButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserSubscription(mode, id) {
        const modes = {
            add: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/subscription-activate/${id}`, method: 'post' },
        }

        return {
            contents: [
                () => <p> Göndər düyməsini təsdiqi etdiyin zaman sistem abunəçiliyini qəbul etmiş olursan və növbəti mərhələdə seçdiyin abunəliklərə əsasən emaillər göndəriləcək! </p>
            ],
            buttons: [ submitButton(), closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUserLinks(mode, id) {
        const modes = {
            add: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/add-userLink/${id}`, method: 'POST' },
            update: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/update-userLink/${id}`, method: 'POST' },
        }

        return {
            fields: [ userLinkUrl(), userLinkTitle(), userLinkType(), status() ],
            buttons: [ submitButton(), closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    deleteUserLinks(mode, id) {
        const modes = {
            delete: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/delete-userLink/${id}`, method: 'DELETE' },
        }

        return {
            contents: [
                (data) => <p> Sil düyməsini təsdiqi etdiyin zaman <strong> {data.title} </strong> linkini bir dəfəlik silmiş olacaqsan və bunun geri qayıdışı olmayacaq, daha sonra yenisini yarada bilərsən! </p>
            ],
            buttons: [ submitButton(), closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateUsernameAvaliability(mode) {
        const modes = {
            find: { url: `${this.baseApiUrl}${process.env.REACT_APP_API_ENDPOINT}/check-userName`, method: 'POST' },
        }

        return {
            fields: [ userUsername() ],
            buttons: [ submitButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateResetPasswordRequest(mode) {
        const modes = {
            add: { url: `${this.baseApiUrl}${process.env.REACT_APP_API_ENDPOINT}/reset-password-request`, method: 'POST' },
        }

        return {
            fields: [ userEmail() ],
            buttons: [ submitButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateResetPassword(mode) {
        const modes = {
            update: { url: `${this.baseApiUrl}${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_RESET_PASSWORD_LINK_KEY}`, method: 'POST' },
        }

        return {
            fields: [ userEmail(), userPassword(), userConfirmPassword() ],
            buttons: [ submitButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    editUserStatus(mode, id) {
        const modes = {
            update: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/${process.env.REACT_APP_USER_ACTIVATE_LINK_KEY}/${id}`, method: 'POST' },
        }

        return {
            contents: [
                (data) => <p> Göndər düyməsini təsdiqi etdiyin zaman <strong> {data.name} {data.surname} </strong> adlı istifadəçini aktif etmiş olacaqsan və bunun qayıdışı yoxdur. Zəhmət olmasa, dəqiqləşdirib elə aktif edəsən! </p>
            ],
            buttons: [ submitButton(), closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    chooseTvsOption(mode) {
        const modes = {}

        return {
            contents: [ () => <p> Zəhmət olmasa, yaratmaq istədiyin formu aşağıdan seçim edərək davam edəsən! </p> ],
            fields: [ faqButton({grid: { col: 6 }, config: 'faq'}), faqGroupButton({grid: { col: 6 }, config: 'group'}) ],
            buttons: [ closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateTvsData(mode) {
        const modes = { 
            faq: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/add-newFaq`, method: 'POST' },
            group: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/add-newFaqGroup`, method: 'POST' },
        }

        const fields = {
            faq: [ faqQuestion(), faqAnswer(), faqGroup(), status(), order() ],
            group: [ faqGroup(), status(), order() ],
        }

        return {
            fields: fields[mode],
            buttons: [ submitButton(), closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    editTvsData(mode, id) {
        const modes = { 
            faq: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/update-selectedFaq/${id}`, method: 'POST' },
            group: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/update-selectedFaqGroup/${id}`, method: 'POST' },
        }

        const fields = {
            faq: [ faqQuestion(), faqAnswer(), faqGroup(), status(), order() ],
            group: [ faqGroup(), status(), order() ],
        }

        return {
            fields: fields[mode],
            buttons: [ submitButton(), closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    deleteTvsData(mode, id) {
        const modes = {
            group: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/delete-selectedFaq/${id}`, method: 'DELETE' },
            faq: { url: `${this.baseApiUrl}${process.env.REACT_APP_USER_API_ENDPOINT}/delete-selectedFaqGroup/${id}`, method: 'DELETE' },
        }

        return {
            contents: [
                (data) => <p> Sil düyməsini təsdiqi etdiyin zaman <strong> {mode === 'faq' ? data.question : data.group} </strong> məlumatını bir dəfəlik silmiş olacaqsan və bunun geri qayıdışı olmayacaq, daha sonra yenisini yarada bilərsən! </p>
            ],
            buttons: [ submitButton(), closeButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }

    generateContactMessage(mode) {
        const modes = {
            send: { url: `${this.baseApiUrl}${process.env.REACT_APP_API_ENDPOINT}/contact`, method: 'post' },
        }

        return {
            fields: [
                contactFullName(),
                userEmail(),
                contactSubject(),
                contactMessage(),
            ],
            buttons: [ submitButton() ],
            submitUrl: modes[mode]?.url || '',
            submitMethod: modes[mode]?.method || '',
        }
    }
}