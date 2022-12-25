const main = document.querySelector('.main');
const btnBay = document.querySelector('.bay__btn');

const modalWrap = document.createElement('div');
const inputsForms = document.createElement('div');
const requisitesCard = document.createElement('div');
const titleCard = document.createElement('h2');
const cardData = document.createElement('div');
const otherData = document.createElement('div');
const validData = document.createElement('div');
const inputDate = document.createElement('input');
const cvvData = document.createElement('div');
const inputCvv = document.createElement('input');
const imgPayment = document.createElement('img');
const numberCard = document.createElement('div');
const numberCardInput = document.createElement('input');
const modal = document.createElement('div');
const btnModal = document.createElement('button');
const titleModal = document.createElement('h2');
const personName = document.createElement('div');
const phoneNumber = document.createElement('div');
const adress = document.createElement('div');
const email = document.createElement('div');
const inputName = document.createElement('input');
const inputPhone = document.createElement('input');
const inputAdress = document.createElement('input');
const inputEmail = document.createElement('input');

titleModal.innerHTML = 'Personal details';
titleCard.innerHTML = 'Credit card details';
validData.innerHTML = 'VALID: ';
cvvData.innerHTML = 'CVV: ';
btnModal.innerHTML = 'CONFIRM';
imgPayment.src = `https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71`;

modalWrap.className = 'modal__wrap';
inputsForms.className = 'inputs__forms';
requisitesCard.className = 'requisites__card';
titleCard.className = 'title__modal';
cardData.className = 'card__data';
btnModal.className = 'bay__btn';
otherData.className = 'other__data';
validData.className = 'valid__data';
inputDate.className = 'input input__card other__input';
inputCvv.className = 'input input__card other__input';
cvvData.className = 'cvv__data';
numberCard.className = 'card__number';
numberCardInput.className = 'input input__card';
imgPayment.className = 'payment__system';
titleModal.className = 'title__modal';
modal.className = 'modal';
personName.className = 'person__name form__item';
phoneNumber.className = 'phone__number form__item';
adress.className = 'adress form__item';
email.className = 'email form__item';
inputName.className = 'input input__name';
inputPhone.className = 'input input__phone';
inputAdress.className = 'input input__adress';
inputEmail.className = 'input input__email';

inputName.type = 'text';
inputPhone.type = 'text';
inputAdress.type = 'text';
inputEmail.type = 'text';
numberCardInput.type = 'text';
inputDate.type = 'text';
inputCvv.type = 'text';

inputName.placeholder = 'Name';
inputPhone.placeholder = 'Phone number';
inputAdress.placeholder = 'Delivery Address';
inputEmail.placeholder = 'E-mail';
inputDate.placeholder = 'Valid Thru';
inputCvv.placeholder = 'Code';
numberCardInput.placeholder = 'Card number';

modalWrap.appendChild(modal);
modal.appendChild(inputsForms);
modal.appendChild(requisitesCard);
modal.appendChild(btnModal);
requisitesCard.appendChild(titleCard);
requisitesCard.appendChild(cardData);
cardData.appendChild(numberCard);
cardData.appendChild(otherData);
otherData.appendChild(validData);
validData.appendChild(inputDate);
cvvData.appendChild(inputCvv);
otherData.appendChild(cvvData);
numberCard.appendChild(imgPayment);
numberCard.appendChild(numberCardInput);
inputsForms.appendChild(titleModal);
inputsForms.appendChild(personName);
inputsForms.appendChild(phoneNumber);
inputsForms.appendChild(adress);
inputsForms.appendChild(email);
personName.appendChild(inputName);
phoneNumber.appendChild(inputPhone);
adress.appendChild(inputAdress);
email.appendChild(inputEmail);

const textError = document.createElement('div');
textError.className = 'error';
textError.innerHTML = 'error';

btnBay?.addEventListener('click', () => {
  main?.appendChild(modalWrap);
});
modalWrap?.addEventListener('click', (e) => {
  if (e.target === modalWrap) {
    main?.removeChild(modalWrap);
  }
});
inputName.addEventListener('blur', () => {
  if (inputName.value != '') {
    if (inputName.value.split(' ').length < 2) {
      personName.appendChild(textError);
    } else {
      if (personName.contains(textError)) {
        personName.removeChild(textError);
      }
    }
    for (let i = 0; i < inputName.value.split(' ').length; i++) {
      if (inputName.value.split(' ')[i].split('').length < 3) {
        personName.appendChild(textError);
        return;
      }
      if (inputName.value.split(' ')[i].split('')[0] != inputName.value.split(' ')[i].split('')[0].toUpperCase()) {
        personName.appendChild(textError);
        return;
      }
    }
  }
});
inputAdress.addEventListener('blur', () => {
  if (inputAdress.value != '') {
    if (inputAdress.value.split(' ').length < 2) {
      adress.appendChild(textError);
    } else {
      if (adress.contains(textError)) {
        adress.removeChild(textError);
      }
    }
    for (let i = 0; i < inputAdress.value.split(' ').length; i++) {
      if (inputAdress.value.split(' ')[i].split('').length < 5) {
        adress.appendChild(textError);
        return;
      }
      if (inputAdress.value.split(' ')[i].split('')[0] != inputAdress.value.split(' ')[i].split('')[0].toUpperCase()) {
        adress.appendChild(textError);
        return;
      }
    }
  }
});
inputPhone.type = 'text';
inputPhone.addEventListener('blur', () => {
  if (inputPhone.value != '') {
    if (inputPhone.value.split('')[0] != '+' || inputPhone.value.split('').length < 9) {
      if (!phoneNumber.contains(textError)) {
        phoneNumber.appendChild(textError);
        return;
      }
    } else {
      for (let i = 1; i < inputPhone.value.split('').length; i++) {
        if (Number.isNaN(Number(inputPhone.value.split('')[i]))) {
          if (!phoneNumber.contains(textError)) {
            phoneNumber.appendChild(textError);
            return;
          }
        } else {
          if (phoneNumber.contains(textError)) {
            phoneNumber.removeChild(textError);
          }
        }
      }
    }
  }
});
inputEmail.type = 'text';
inputEmail.addEventListener('blur', () => {
  let str = '@';
  let k = 0;
  for (let i = 1; i < inputEmail.value.split('').length; i++) {
    if (inputEmail.value.split('')[i] == str) {
      if (str == '.') {
        if (email.contains(textError)) {
          email.removeChild(textError);
        }
        break;
      } else {
        if (!email.contains(textError)) {
          email.appendChild(textError);
        }
      }
      str = '.';
      i++;
    } else {
      if (!email.contains(textError)) {
        email.appendChild(textError);
      }
    }
  }
  for (let i = 0; i < inputEmail.value.split('').length; i++) {
    if (inputEmail.value.split('')[i] == '@') {
      k = k + 1;
      if (k > 1) {
        if (!email.contains(textError)) {
          email.appendChild(textError);
        }
        return;
      }
    }
  }
  for (let i = 0; i < inputEmail.value.split('').length; i++) {
    if (inputEmail.value.split('').reverse()[i] == '.') {
      if (i > 1) {
        if (email.contains(textError)) {
          email.removeChild(textError);
        }
      } else {
        if (!email.contains(textError)) {
          email.appendChild(textError);
        }
      }
      break;
    }
  }
  for (let i = 0; i < inputEmail.value.split('').length; i++) {
    if (inputEmail.value.split('')[i] == '.') {
      if (inputEmail.value.split('')[i + 1] == '.') {
        if (!email.contains(textError)) {
          email.appendChild(textError);
        }
      }
    }
  }
  for (let i = 0; i < inputEmail.value.split('').length; i++) {
    if (inputEmail.value.split('')[i] == '@') {
      if (inputEmail.value.split('')[i + 1] == '.') {
        if (!email.contains(textError)) {
          email.appendChild(textError);
        }
      }
    }
  }
  for (let i = 0; i < inputEmail.value.split('').length; i++) {
    if (inputEmail.value.split('')[i] == '.') {
      if (inputEmail.value.split('')[i + 1] == '@') {
        if (!email.contains(textError)) {
          email.appendChild(textError);
        }
      }
    }
  }
  if (inputEmail.value.split('')[0] === '@') {
    if (!email.contains(textError)) {
      email.appendChild(textError);
    }
  }
});
