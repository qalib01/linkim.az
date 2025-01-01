export function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

export function isNotEmpty(value) {
    if (typeof value !== 'string') { return !!value }
    return value.trim() !== '';
}

export function isValidUsername(value) {
    const usernameRegex = /^[0-9a-z_.]+$/;
    return usernameRegex.test(value);
};

export function isValidURL(value) {
    const urlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
    return urlRegex.test(value);
}

export function isValidImage(value) {;
    return value.type.startsWith('image/');
}

export function isValidPassword(value) {
    const urlRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return urlRegex.test(value);
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}

export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}

export function hasMaxLength(value, maxLength) {
    return value.length <= maxLength;
}

export function hasMaxTrimedLength(value, maxLength) {
    return value.trim().length <= maxLength;
}

export function isEqualsToOtherValue(value, otherValue) {
    return value === otherValue;
}

export function isContentCatchMaxLimit(value, maxLength) {
    return value.trim().length <= maxLength;
}