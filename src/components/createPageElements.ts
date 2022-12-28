import { productDatum, lsObject } from '../types';

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
  if (!window.localStorage.getItem('online_store__storage')) {
    const piece: lsObject[] = [];
    window.localStorage.setItem('online_store__storage', JSON.stringify(piece));
  }
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

      // console.log(objKeys)
      element?.append(addOrDropBtn);
      function check() {
        const storage: lsObject[] = JSON.parse(window.localStorage.getItem('online_store__storage') as string);
        const storageKeys = storage.map((el) => el.id);
        if (storageKeys.includes(el.id)) {
          addOrDropBtn.innerText = 'Drop from Cart';
        } else {
          addOrDropBtn.innerText = 'Add to Cart';
        }
      }
      check();

      addOrDropBtn.addEventListener('click', () => {
        const storage: lsObject[] = JSON.parse(window.localStorage.getItem('online_store__storage') as string);
        const storageKeys = storage.map((el) => el.id);
        if (storageKeys.includes(el.id)) {
          window.localStorage.removeItem('online_store__storage');
          storage.forEach((item, index) => {
            if (item.id === el.id) {
              storage.splice(index, 1);
            }
          });
          window.localStorage.setItem('online_store__storage', JSON.stringify(storage));
          check();
          window.location.assign('#');
        } else {
          window.localStorage.removeItem('online_store__storage');
          const temp = {
            id: el.id,
            amount: 1,
          };
          storage.push(temp);
          window.localStorage.setItem('online_store__storage', JSON.stringify(storage));
          check();
          window.location.assign('#');
        }
      });
    }

    boxWrapper.appendChild(boxTitle);
    boxWrapper.appendChild(descriptionBox);
    addButton(productBox);
    // productBox.append(addOrDropBtn);
    place.appendChild(productBox);
  });
}
