import { productDatum, lsObject } from '../types';
import { checkLS, addToCartListener } from './addToCart';

export function createList(data: string[], quantity: string[], place: HTMLTemplateElement): void {
  for (let i = 0; i < data.length; i++) {
    const checkBoxLine = document.createElement('div');
    checkBoxLine.classList.add('checkbox__line');
    const checkBox = document.createElement('input');
    checkBox.className = 'input__filter';
    const label = document.createElement('label');
    label.textContent = data[i];
    checkBox.setAttribute('id', `${data[i]}`);
    checkBox.setAttribute('type', `checkbox`);
    label.setAttribute('for', `${data[i]}`);
    checkBoxLine.appendChild(checkBox);
    checkBoxLine.appendChild(label);

    const count = document.createElement('div');
    count.textContent = quantity[i];
    checkBoxLine.appendChild(count);

    place.appendChild(checkBoxLine);
  }
}


export function createRange(place: HTMLTemplateElement, data?: number[]): void {
  const inputRangeleft = document.createElement('input');
  const inputRangeRight = document.createElement('input');
  const inputSliderTrack = document.createElement('div');
  const titleFilter = document.createElement('div');
  const leftBorder = document.createElement('div');
  const rightBorder = document.createElement('div');

  inputRangeleft.type = 'range';
  inputRangeRight.type = 'range';

  data?.sort(function (a: number, b: number): number {
    return a - b;
  });
  console.log(data);

  inputRangeleft.className = 'input__range input__range-left';
  inputRangeRight.className = 'input__range input__range-right';
  inputSliderTrack.className = 'input__track';
  titleFilter.className = 'title__filter';
  leftBorder.className = 'left__border';
  rightBorder.className = 'right__border';

  titleFilter.innerHTML = '—';

  if (data?.length === 49) {
    leftBorder.innerText = '€ ' + data[0];
    rightBorder.innerText = '€ ' + data[data.length - 1];
  } else if (data) {
    leftBorder.innerText = String(data[0]);
    rightBorder.innerText = String(data[data.length - 1]);
  }

  titleFilter.prepend(leftBorder);
  titleFilter.append(rightBorder);

  if (data) {
    inputRangeleft.max = String(data?.length - 1);
    inputRangeRight.max = String(data?.length - 1);
  }

  inputRangeleft.min = '0';
  inputRangeRight.min = '0';

  if (!place.classList.contains('input__range input__range-left')) {
    place.append(inputRangeleft);
  }
  if (!place.classList.contains('input__range input__range-right')) {
    place.append(inputRangeRight);
  }
  if (!place.classList.contains('input__track')) {
    place.prepend(inputSliderTrack);
  }
  if (!place.classList.contains('title__filter')) {
    place.prepend(titleFilter);
  }
  inputRangeleft.value = '0';
  inputRangeRight.value = '100';
  const minGap = 1;
  // inputRangeleft.value = String(parseInt(inputRangeRight.value) - minGap);
  inputRangeleft.addEventListener('input', () => {
    if (parseInt(inputRangeRight.value) - parseInt(inputRangeleft.value) <= 0) {
      inputRangeleft.value = String(parseInt(inputRangeRight.value) - minGap);
    }
    if (data?.length === 49) {
      leftBorder.innerText = '€ ' + data[Number(inputRangeleft.value)];
    } else if (data) {
      leftBorder.innerText = String(data[Number(inputRangeleft.value)]);
    }
  });
  inputRangeRight.addEventListener('input', () => {
    if (parseInt(inputRangeRight.value) - parseInt(inputRangeleft.value) <= 0) {
      inputRangeRight.value = String(parseInt(inputRangeleft.value) + minGap);
    }
    if (data?.length === 49) {
      rightBorder.innerText = '€ ' + data[Number(inputRangeRight.value)];
    } else if (data) {
      rightBorder.innerText = String(data[Number(inputRangeRight.value)]);
    }
  });
}

export function createProducts(productData: productDatum[], place: HTMLTemplateElement): void {
  const cartAmount: HTMLElement = document.querySelector('.cart__quantity') as HTMLElement;
  const total: HTMLElement = document.querySelector('.total__amount') as HTMLElement;
  if (!window.localStorage.getItem('online_store__storage')) {
    const piece: lsObject[] = [];
    window.localStorage.setItem('online_store__storage', JSON.stringify(piece));
  }
  if (!window.localStorage.getItem('online_store__total')) {
    const totalCost = 0;
    window.localStorage.setItem('online_store__total', `${totalCost}.00 \u20ac`);
    // window.localStorage.setItem('online_store__total_discount', `${totalCost}.00 \u20ac`);

export function createProducts(
  productData: productDatum[],
  place: HTMLTemplateElement,
  foundValue: HTMLSpanElement
): void {
  if (!productData.length) {
    foundValue.innerText = '0';
    const notFound = document.createElement('h2');
    notFound.className = 'not_found__headline';
    notFound.innerText = 'No products found';
    while (place.hasChildNodes()) {
      place.removeChild(place.childNodes[0]);
    }
    place.append(notFound);
  } else {
    foundValue.innerText = `${productData.length}`;
    const cartAmount: HTMLElement = document.querySelector('.cart__quantity') as HTMLElement;
    const total: HTMLElement = document.querySelector('.total__amount') as HTMLElement;
    if (!window.localStorage.getItem('online_store__storage')) {
      const piece: lsObject[] = [];
      window.localStorage.setItem('online_store__storage', JSON.stringify(piece));
    }
    if (!window.localStorage.getItem('online_store__total')) {
      const totalCost = 0;
      window.localStorage.setItem('online_store__total', `${totalCost}.00 \u20ac`);
    } else {
      const totalCost: string = window.localStorage.getItem('online_store__total') as string;
      total.innerText = `${totalCost}`;
    }

    place.innerHTML = '';
    productData.forEach((el) => {
      const productBox = document.createElement('div');
      productBox.classList.add('product-box');
      productBox.style.backgroundImage = `url(${el.thumbnail})`;

      const boxWrapper = document.createElement('a');
      boxWrapper.className = 'product-box__wrapper';
      boxWrapper.href = `#product-details#${el.id}`;
      productBox.append(boxWrapper);

      const boxTitle = document.createElement('div');
      boxTitle.classList.add('product-box__title');
      boxTitle.textContent = el.title;

      const descriptionBox = document.createElement('div');
      descriptionBox.classList.add('product_description');

      const descriptionValues: string[] = [
        el.category,
        el.brand,
        `\u20ac ${el.price}`,
        `${el.discountPercentage}%`,
        `${el.rating}`,
        `${el.stock}`,
      ];
      const descriptionParametars: string[] = ['Category: ', 'Brand: ', 'Price: ', 'Discount: ', 'Rating: ', 'Stock: '];

      for (let i = 0; i < 6; i++) {
        const paragraph = document.createElement('p');
        const span = document.createElement('span');
        paragraph.textContent = descriptionParametars[i];
        span.textContent = descriptionValues[i];
        paragraph.appendChild(span);
        descriptionBox.appendChild(paragraph);
      }

      function addButton(element?: HTMLElement) {
        const addOrDropBtn = document.createElement('button');
        addOrDropBtn.className = 'addBtn';
        element?.append(addOrDropBtn);

        checkLS(total, cartAmount, el, addOrDropBtn);

        addOrDropBtn.addEventListener('click', () => {
          addToCartListener(total, cartAmount, el, addOrDropBtn);
        });
      }

      boxWrapper.appendChild(boxTitle);
      boxWrapper.appendChild(descriptionBox);
      addButton(productBox);
      place.appendChild(productBox);
    });
  }
}
