const PASSWORD_REGEX = new RegExp(/^(?=.*\d)(?=.*[A-ZА-Я])(?=.*[a-zа-я])(?=.*[^\w\d\s:])([^\s]){8,}$/g);
const EMAIL_REGEX = new RegExp(/^(\w+)(?:\.?\w+)*@\w+(\.\w{2,})$/gu);
export {PASSWORD_REGEX, EMAIL_REGEX};