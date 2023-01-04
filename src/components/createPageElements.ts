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
