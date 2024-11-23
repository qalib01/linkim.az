export function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}

export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
    return value === otherValue;
}

export function isContentCatchMaxLimit(value, maxLength) {
    return value.trim().length <= maxLength;
}