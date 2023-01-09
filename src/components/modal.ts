export default function createPopap(thisMain: HTMLElement, btnBtn: HTMLElement) {
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

  btnBtn.addEventListener('click', () => {
    thisMain?.appendChild(modalWrap);
  });
  modalWrap?.addEventListener('click', (e) => {
    if (e.target === modalWrap) {
      thisMain?.removeChild(modalWrap);
    }
  });
  inputName.addEventListener('blur', () => {
    if (inputName.value != '') {
      if (inputName.value.split(' ').length < 2) {
        if (!personName.querySelector('.error')) {
          const textError = document.createElement('div');
          textError.className = 'error';
          textError.innerHTML = 'error';
          personName.appendChild(textError);
          return;
        }
      } else {
        if (personName.querySelector('.error')) {
          personName.removeChild(personName.querySelector('.error') as Element);
        }
      }
      for (let i = 0; i < inputName.value.split(' ').length; i++) {
        if (inputName.value.split(' ')[i].split('').length < 3) {
          if (!personName.querySelector('.error')) {
            const textError = document.createElement('div');
            textError.className = 'error';
            textError.innerHTML = 'error';
            personName.appendChild(textError);
            return;
          }
        }
        if (inputName.value.split(' ')[i].split('')[0] != inputName.value.split(' ')[i].split('')[0].toUpperCase()) {
          if (!personName.querySelector('.error')) {
            const textError = document.createElement('div');
            textError.className = 'error';
            textError.innerHTML = 'error';
            personName.appendChild(textError);
            return;
          }
        }
      }
    }
  });
  inputAdress.addEventListener('blur', () => {
    if (inputAdress.value != '') {
      if (inputAdress.value.split(' ').length < 2) {
        if (!adress.querySelector('.error')) {
          const textError = document.createElement('div');
          textError.className = 'error';
          textError.innerHTML = 'error';
          adress.appendChild(textError);
        }
        return;
      } else {
        if (adress.querySelector('.error')) {
          adress.removeChild(adress.querySelector('.error') as Element);
        }
      }
      for (let i = 0; i < inputAdress.value.split(' ').length; i++) {
        if (inputAdress.value.split(' ')[i].split('').length < 5) {
          if (!adress.querySelector('.error')) {
            const textError = document.createElement('div');
            textError.className = 'error';
            textError.innerHTML = 'error';
            adress.appendChild(textError);
          }
          return;
        }
        if (
          inputAdress.value.split(' ')[i].split('')[0] != inputAdress.value.split(' ')[i].split('')[0].toUpperCase()
        ) {
          if (!adress.querySelector('.error')) {
            const textError = document.createElement('div');
            textError.className = 'error';
            textError.innerHTML = 'error';
            adress.appendChild(textError);
          }
          return;
        }
      }
    }
  });
  inputPhone.type = 'text';
  inputPhone.addEventListener('blur', () => {
    if (inputPhone.value != '') {
      if (inputPhone.value.split('')[0] != '+' || inputPhone.value.split('').length < 9) {
        if (!phoneNumber.querySelector('.error')) {
          const textError = document.createElement('div');
          textError.className = 'error';
          textError.innerHTML = 'error';
          phoneNumber.appendChild(textError);
        }
        return;
      } else {
        for (let i = 1; i < inputPhone.value.split('').length; i++) {
          if (Number.isNaN(Number(inputPhone.value.split('')[i]))) {
            if (!phoneNumber.querySelector('.error')) {
              const textError = document.createElement('div');
              textError.className = 'error';
              textError.innerHTML = 'error';
              phoneNumber.appendChild(textError);
            }
            return;
          } else {
            if (phoneNumber.querySelector('.error')) {
              phoneNumber.removeChild(phoneNumber.querySelector('.error') as Element);
            }
          }
        }
      }
    }
  });
  inputEmail.type = 'text';
  inputEmail.addEventListener('blur', () => {
    if (inputEmail.value != '') {
      let str = '@';
      let k = 0;
      for (let i = 1; i < inputEmail.value.split('').length; i++) {
        if (inputEmail.value.split('')[i] == str) {
          if (str == '.') {
            if (email.querySelector('.error')) {
              email.removeChild(email.querySelector('.error') as Element);
            }
            break;
          } else {
            if (!email.querySelector('.error')) {
              const textError = document.createElement('div');
              textError.className = 'error';
              textError.innerHTML = 'error';
              email.appendChild(textError);
            }
          }
          str = '.';
          i++;
        }
      }
      for (let i = 0; i < inputEmail.value.split('').length; i++) {
        if (inputEmail.value.split('')[i] == '@') {
          k = k + 1;
          if (k > 1) {
            if (!email.querySelector('.error')) {
              const textError = document.createElement('div');
              textError.className = 'error';
              textError.innerHTML = 'error';
              email.appendChild(textError);
            }
            return;
          }
        }
      }
      for (let i = 0; i < inputEmail.value.split('').length; i++) {
        if (inputEmail.value.split('').reverse()[i] == '.') {
          if (i > 1) {
            if (email.querySelector('.error')) {
              email.removeChild(email.querySelector('.error') as Element);
            }
          } else {
            if (!email.querySelector('.error')) {
              const textError = document.createElement('div');
              textError.className = 'error';
              textError.innerHTML = 'error';
              email.appendChild(textError);
            }
            return;
          }
          break;
        }
      }
      for (let i = 0; i < inputEmail.value.split('').length; i++) {
        if (inputEmail.value.split('')[i] == '.') {
          if (inputEmail.value.split('')[i + 1] == '.') {
            if (!email.querySelector('.error')) {
              const textError = document.createElement('div');
              textError.className = 'error';
              textError.innerHTML = 'error';
              email.appendChild(textError);
            }
            return;
          }
        }
      }
      for (let i = 0; i < inputEmail.value.split('').length; i++) {
        if (inputEmail.value.split('')[i] == '@') {
          if (inputEmail.value.split('')[i + 1] == '.') {
            if (!email.querySelector('.error')) {
              const textError = document.createElement('div');
              textError.className = 'error';
              textError.innerHTML = 'error';
              email.appendChild(textError);
            }
            return;
          }
        }
      }
      for (let i = 0; i < inputEmail.value.split('').length; i++) {
        if (inputEmail.value.split('')[i] == '.') {
          if (inputEmail.value.split('')[i + 1] == '@') {
            if (!email.querySelector('.error')) {
              const textError = document.createElement('div');
              textError.className = 'error';
              textError.innerHTML = 'error';
              email.appendChild(textError);
            }
            return;
          }
        }
      }
      if (inputEmail.value.split('')[0] === '@') {
        if (!email.querySelector('.error')) {
          const textError = document.createElement('div');
          textError.className = 'error';
          textError.innerHTML = 'error';
          email.appendChild(textError);
        }
        return;
      }
      if (k === 0) {
        if (!email.querySelector('.error')) {
          const textError = document.createElement('div');
          textError.className = 'error';
          textError.innerHTML = 'error';
          email.appendChild(textError);
        }
        return;
      }
    }
  });
  numberCardInput.maxLength = 19;
  numberCardInput.addEventListener('input', () => {
    if (numberCardInput.value.split('')[0] === '4') {
      imgPayment.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
    } else if (numberCardInput.value.split('')[0] === '5') {
      imgPayment.src = 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
    } else if (numberCardInput.value.split('')[0] === '3') {
      imgPayment.src = 'https://m.oborudunion.ru/logo/4243102.jpg';
    } else {
      imgPayment.src =
        'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';
    }
  });
  numberCardInput.addEventListener('keypress', (e) => {
    if (e.key === ' ' || Number.isNaN(Number(e.key))) {
      e.preventDefault();
    }
    if (
      numberCardInput.value.length === 4 ||
      numberCardInput.value.length === 9 ||
      numberCardInput.value.length === 14
    ) {
      numberCardInput.value += ' ';
    }
    if (numberCardInput.value.length === 19) {
      if (cardData.querySelector('.error')) {
        cardData.removeChild(cardData.querySelector('.error') as Element);
      }
    }
  });
  inputDate.maxLength = 5;
  inputDate.addEventListener('keypress', (e) => {
    if (e.key === ' ' || Number.isNaN(Number(e.key))) {
      e.preventDefault();
    }
    if (inputDate.value.length === 5) {
      if (cardData.querySelector('.error')) {
        cardData.removeChild(cardData.querySelector('.error') as Element);
      }
    }
    if (inputDate.value.length === 2) {
      inputDate.value += '/';
    }
    if (Number(inputDate.value.split('')[0]) == 0 && Number(inputDate.value.split('')[1]) == 0) {
      if (!cardData.querySelector('.error')) {
        const textError = document.createElement('div');
        textError.className = 'error';
        textError.innerHTML = 'error';
        cardData.appendChild(textError);
      }
      return;
    }
    if (Number(inputDate.value.split('')[0]) > 1) {
      if (!cardData.querySelector('.error')) {
        const textError = document.createElement('div');
        textError.className = 'error';
        textError.innerHTML = 'error';
        cardData.appendChild(textError);
      }
      return;
    } else {
      if (Number(inputDate.value.split('')[1]) > 2) {
        if (!cardData.querySelector('.error')) {
          const textError = document.createElement('div');
          textError.className = 'error';
          textError.innerHTML = 'error';
          cardData.appendChild(textError);
          return;
        }
      }
      if (cardData.querySelector('.error')) {
        cardData.removeChild(cardData.querySelector('.error') as Element);
      }
    }
  });
  inputCvv.maxLength = 3;
  inputCvv.addEventListener('keypress', (e) => {
    if (e.key === ' ' || Number.isNaN(Number(e.key))) {
      e.preventDefault();
    }
    if (inputCvv.value.length === 3) {
      if (cardData.querySelector('.error')) {
        cardData.removeChild(cardData.querySelector('.error') as Element);
      }
    }
  });
  btnModal.addEventListener('click', () => {
    if (inputName.value === '') {
      if (!phoneNumber.querySelector('.error')) {
        const textError = document.createElement('div');
        textError.className = 'error';
        textError.innerHTML = 'error';
        personName.appendChild(textError);
      }
    }
    if (inputCvv.value.length < 3) {
      if (!cardData.querySelector('.error')) {
        const textError = document.createElement('div');
        textError.className = 'error';
        textError.innerHTML = 'error';
        cardData.appendChild(textError);
      }
    }
    if (inputDate.value.length < 5) {
      if (!cardData.querySelector('.error')) {
        const textError = document.createElement('div');
        textError.className = 'error';
        textError.innerHTML = 'error';
        cardData.appendChild(textError);
      }
    }
    if (inputAdress.value === '') {
      if (!phoneNumber.querySelector('.error')) {
        const textError = document.createElement('div');
        textError.className = 'error';
        textError.innerHTML = 'error';
        adress.appendChild(textError);
      }
    }
    if (inputPhone.value === '') {
      if (!phoneNumber.querySelector('.error')) {
        const textError = document.createElement('div');
        textError.className = 'error';
        textError.innerHTML = 'error';
        phoneNumber.appendChild(textError);
      }
    }
    if (inputEmail.value === '') {
      if (!email.querySelector('.error')) {
        const textError = document.createElement('div');
        textError.className = 'error';
        textError.innerHTML = 'error';
        email.appendChild(textError);
      }
    }
    if (numberCardInput.value.length < 19) {
      if (!cardData.querySelector('.error')) {
        const textError = document.createElement('div');
        textError.className = 'error';
        textError.innerHTML = 'error';
        cardData.appendChild(textError);
      }
    }
    if (!modal.querySelector('.error')) {
      let i = 3;
      modal.innerHTML = `Thanks for the order! Go to the main page via (${i})`;
      setInterval(() => {
        i--;
        modal.innerHTML = `Thanks for the order! Go to the main page via (${i})`;
      }, 1000);
      setTimeout(() => {
        window.localStorage.clear();
        window.location.assign('#');
      }, 4000);
    }
  });
}
