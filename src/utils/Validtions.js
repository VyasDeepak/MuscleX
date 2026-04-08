export const maxLengthPassword = 16;
export const minLengthPassword = 8;
export const minLengthName = 1;
export const maxLengthName = 45;
export const minLengthMobile = 7;
export const maxLengthMobile = 15;
export const maxLengthEmail = 60;
export const maxLengthUsername = 25;
export function ValidateForm(form) {
  let isValidForm = true;

  var emojiRegexp =
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
  var urlRegex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  // var strongPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?=.{8,})/;
  var strongPassword = /^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
  //
  var noSpecialChar = /^[a-zA-Z0-9- ]*$/;
  var panCard = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  // var gstNumber = /([0-9]){2}([A-Z]){5}([0-9]){4}([1-9A-Z]){1}([0-9A-Z]){1}$/;
  var gstNumber = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}[Z][0-9A-Z]{1}$/;

  var companyName = /^[a-zA-Z ]+$/;
  var alphabetsOnly = /^[a-zA-Z ]+$/;
  var pinCode = /^[0-9]+$/;

  var reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //email
  var numberRegex = /^\d+$/; // number
  var noSpaceRegex = /^\S*$/; // no spaces
  for (let val in form.validators) {
    form.validators[val].error = '';
    for (let i in form.validators[val]) {
      let message = '';
      if (form.validators[val].error != '') break;

      let valData = form.validators[val][i];
      if (i == 'required' && (!form[val] || !form[val].toString().trim())) {
        let value = (val.charAt(0).toLocaleLowerCase() + val.slice(1))
          .split('_')
          .join(' ');
        message = `Please enter your ${value}`;
      } else if (i == 'noSpecial' && noSpecialChar.test(form[val]) == false) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        message = 'Special character is not allowed in ' + value;
      } else if (
        (i == 'minLength' || i == 'minLengthDigit') &&
        form[val].length < valData
      ) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        var cStr = i == 'minLengthDigit' ? ' ' + 'digits' : ' ' + 'characters';
        message = value + ' ' + 'must be at least' + ' ' + valData + cStr;
      } else if (
        (i == 'maxLength' || i == 'maxLengthDigit') &&
        form[val].length > valData
      ) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        var cStr = i == 'maxLengthDigit' ? ' ' + 'digits' : ' ' + 'characters';
        message = value + ' ' + 'should be smaller than' + ' ' + valData + cStr;
      } else if (i == 'matchWith' && form[val] != form[valData]) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        let value2 = (valData.charAt(0).toUpperCase() + valData.slice(1))
          .split('_')
          .join(' ');
        message = 'Password & confirm password should be the same';
      } else if (i == 'email' && reg.test(form[val]) == false) {
        message = 'Please enter a valid email address';
      } else if (i == 'numeric' && numberRegex.test(form[val]) == false) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        if (value.length != 15) {
          message = value + ' ' + 'must be 10 digits';
        }
        message = 'Please enter a valid Mobile Number';
      } else if (i == 'emoji' && emojiRegexp.test(form[val]) == true) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        message = 'Emoji is not allowed in ' + value;
      } else if (i == 'weblink' && urlRegex.test(form[val]) == false) {
        message = 'Please enter valid url';
      } else if (i == 'password' && strongPassword.test(form[val]) == false) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        message =
          value + ' ' + 'must have uppercase,special character and number';
      } else if (i == 'panCard' && panCard.test(form[val]) == false) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        message = 'Please enter a valid Pan Card Number';
        // message = value + " " + "is not valid";
      } else if (i == 'gstNumber' && gstNumber.test(form[val]) == false) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        // if (value.length < 15) {
        message = 'Please enter a valid GST Number';
        // }
        // message = value + " " + "is not valid";
      } else if (
        i == 'alphabetsOnly' &&
        alphabetsOnly.test(form[val]) == false
      ) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        message = value + ' ' + 'must only contain alphabets';
      } else if (i == 'companyName' && companyName.test(form[val]) == false) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        message = value + ' ' + 'must be valid';
      } else if (i == 'pinCode' && pinCode.test(form[val]) == false) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        message = value + ' ' + 'must be valid';
      } else if (i == 'noSpace' && noSpaceRegex.test(form[val]) == false) {
        let value = (val.charAt(0).toUpperCase() + val.slice(1))
          .split('_')
          .join(' ');
        message = value + ' ' + 'cannot contain spaces';
      }
      if (message && form?.validators[val]?.required) {
        isValidForm = false;
        form.validators[val].error = message;
      } else {
        form.validators[val].error = '';
      }
    }
  }
  return {
    value: form,
    status: isValidForm,
  };
}
