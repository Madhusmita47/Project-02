//----------checking input value is valid or not---------------
const valid = function (value) {
    if (typeof value == "number" || typeof value == "undefined" || typeof value == null)  return false 

    if (typeof value == "string" && value.trim().length == 0) { return false }
    return true
}
//------------checking with regex--------------
const regForName = function (value) { return (/^[A-Za-z]+$\b/).test(value) }

const regForFullName = function (value) { return (/^[A-Z][a-z]{1,}(?: [A-Z][a-z]+){0,}$/gm).test(value) }

const regForLink = function (value) {
    return (/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi).test(value)
}
const regForEmail = function (value) { return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(value) }

const regForMobileNo = function (value) { return (/^((\+91)?|91)?[789][0-9]{9}$/g).test(value) }

module.exports={value,regForName,regForFullName,regForLInk,regForEmail,regForMobileNo}