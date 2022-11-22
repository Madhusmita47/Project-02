//----------checking input value is valid or not---------------
const valid = function (value) {
    if (typeof value == "number" || typeof value == "undefined" || typeof value == null)  return false 

    if (typeof value == "string" && value.trim().length == 0) { return false }
    return true
}
//------------checking with regex--------------
const regForName = function (value) { return (/^[A-Za-z ]+$\b/).test(value) }

const regForFullName = function (value) {
    let re = /^[a-zA-Z, ]+(\s[a-zA-Z, ]+)?$/
    return re.test(value)
    }

const regForLink = function (value) {
    let re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    return re.test(value)
}
const regForEmail = function (value) { return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(value) }

const regForMobileNo = function (value) { return (/^((\+91)?|91)?[789][0-9]{9}$/g).test(value) }

module.exports={regForName,regForFullName,regForEmail,regForMobileNo,valid,regForLink}