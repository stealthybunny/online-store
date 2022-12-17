import { productDatum } from '../types';

export function createList(data: string[], place: HTMLTemplateElement): void {
  data.forEach((el) => {
    const checkBoxLine = document.createElement('div');
    checkBoxLine.classList.add('checkbox__line');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    label.textContent = el;
    checkBox.setAttribute('id', `${el}`);
    checkBox.setAttribute('type', `checkbox`);
    label.setAttribute('for', `${el}`);
    checkBoxLine.appendChild(checkBox);
    checkBoxLine.appendChild(label);

    place.appendChild(checkBoxLine);
  });
}

export function createProducts(productData: productDatum[], place: HTMLTemplateElement): void {
  productData.forEach((el) => {
    const productBox = document.createElement('div');
    productBox.classList.add('product-box');
    productBox.style.backgroundImage = `url(${el.thumbnail})`;

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

    productBox.appendChild(boxTitle);
    productBox.appendChild(descriptionBox);
    place.appendChild(productBox);
  });
}
