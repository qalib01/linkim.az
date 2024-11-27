export function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function isUsername(value) {
    const usernameRegex = /^[0-9a-z_.]+$/;
    return usernameRegex.test(value);
};

export function isValidURL(value) {
    const urlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
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

export function isEqualsToOtherValue(value, otherValue) {
    return value === otherValue;
}

export function isContentCatchMaxLimit(value, maxLength) {
    return value.trim().length <= maxLength;
}