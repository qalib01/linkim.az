export function isValidEmail(value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value);
}

export function isNotEmpty(value) {
    if (typeof value !== 'string') { return !!value }
    return value?.trim() !== '';
}

export function isValidUsername(value) {
    const usernameRegex = /^(?!.*[_.]{2})(?![_.])(?!.*\d{7,})([a-zA-Z0-9._]{3,12})(?<![_.])$/;
    return usernameRegex.test(value);
};

export function isMobileNumber(value) {
    const mobilRegex = /^(?:\+994|0)?(50|51|55|70|77|99)\d{7}$/;
    return mobilRegex.test(value)
}

export function isValidURL(value) {
    const urlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
    return urlRegex.test(value);
}

export function isBlockedWord(value) {
    const blockedWords = ['admin', 'support', 'system', 'root', 'staff'];
    return blockedWords.includes(value.toLowerCase().trim());
}

export function isValidPassword(value) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~\\-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?/~\\-]{8,64}$/;
    return passwordRegex.test(value);
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}

export function hasMinLength(value, minLength) {
    return value?.length >= minLength;
}

export function hasMaxLength(value, maxLength) {
    return value?.length <= maxLength;
}

export function hasMaxTrimedLength(value, maxLength) {
    return value?.trim().length <= maxLength;
}

export function isEqualsToOtherValue(value, otherValue) {
    return value === otherValue;
}

export function isContentCatchMaxLimit(value, maxLength) {
    return value?.trim().length <= maxLength;
}