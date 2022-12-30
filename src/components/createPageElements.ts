import { productDatum } from '../types';

export function createList(data: string[], quantity: string[], place: HTMLTemplateElement): void {
  for (let i = 0; i < data.length; i++) {
    const checkBoxLine = document.createElement('div');
    checkBoxLine.classList.add('checkbox__line');
    const checkBox = document.createElement('input');
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
  place.innerHTML = '';
  productData.forEach((el) => {
    const productBox = document.createElement('a');
    productBox.href = `#product-details#${el.id}`;
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
