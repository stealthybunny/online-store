import { lsObject } from '../types';
import { checkLS } from './addToCart';
import { totalAndAmount } from './summaryCreation';

function getStorage() {
  console.log('getStorage');
  const storage: lsObject[] = JSON.parse(window.localStorage.getItem('online_store__storage') as string);
  let amount = 0;
  let price = 0;
  storage.forEach((el) => {
    amount += el.amount;
    price += el.price;
  });
  return [amount, price];
}

function storageCheck(productsAmount: HTMLElement, totalCost: HTMLElement) {
  console.log('Im working rigth now');
  console.log(productsAmount, totalCost);
  const results: number[] = getStorage();
  console.log(results);
  productsAmount.innerText = ` ${results[0]}`;
  totalCost.innerText = ` ${results[1]}.00 \u20ac`;
}

function checkPromoCodes(summary: HTMLElement, totalCostLine: HTMLElement, promoDescription?: HTMLElement) {
  if (promoDescription) {
    promoDescription.parentNode?.removeChild(promoDescription);
  }
  const existingTable = document.querySelector('.promocodes__table');
  existingTable?.parentNode?.removeChild(existingTable);
  const results = parseFloat((window.localStorage.getItem('online_store__total') as string).split(' ')[0]);
  let percent = 1;
  const promoCodes: string[] = JSON.parse(window.localStorage.getItem('online_sotre__promoCodes') as string);

  if (promoCodes.includes('RS')) {
    percent -= 0.1;
  }
  if (promoCodes.includes('EPM')) {
    percent -= 0.1;
  }
  const newCost = percent * results;

  if (percent !== 1) {
    if (!totalCostLine.classList.contains('crossed')) {
      totalCostLine.classList.add('crossed');
      const newTotalCostLine = document.createElement('p');
      newTotalCostLine.className = 'new_summary__total_line';
      newTotalCostLine.innerText = 'Total: ';

      const newTotalCost = document.createElement('span');
      newTotalCost.className = 'new_summary__total_cost';
      newTotalCost.innerText = `${newCost.toFixed(2)} \u20ac`;

      newTotalCostLine.append(newTotalCost);
      totalCostLine.after(newTotalCostLine);
    } else {
      const newTotalCost = document.querySelector('.new_summary__total_cost') as HTMLElement;
      newTotalCost.innerText = `${newCost.toFixed(2)} \u20ac`;
    }

    const promocodesTable = document.createElement('div');
    promocodesTable.className = 'promocodes__table';

    const promocodesHeadline = document.createElement('h3');
    promocodesHeadline.className = 'promocodes__headline';
    promocodesHeadline.innerText = 'Applied codes';

    promocodesTable.append(promocodesHeadline);

    const codesArr: string[] = ['Rolling Scopes School', 'EPAM Systems'];
    promoCodes.forEach((el, index) => {
      const appliedCodeLine = document.createElement('div');
      appliedCodeLine.className = 'promocodes__line';
      if (el === 'RS') {
        appliedCodeLine.innerText = `${codesArr[0]} - 10% - `;
      } else if (el === 'EPM') {
        appliedCodeLine.innerText = `${codesArr[1]} - 10% - `;
      }
      const codeDropBtn = document.createElement('span');
      codeDropBtn.className = 'code_drop__button';
      codeDropBtn.innerText = 'DROP';
      codeDropBtn.addEventListener('click', () => {
        window.localStorage.removeItem('online_sotre__promoCodes');
        promoCodes.splice(index, 1);
        window.localStorage.setItem('online_sotre__promoCodes', JSON.stringify(promoCodes));
        checkPromoCodes(summary, totalCostLine);
      });
      appliedCodeLine.append(codeDropBtn);

      promocodesTable.append(appliedCodeLine);
    });
    totalCostLine.after(promocodesTable);
    window.location.assign('#cart-page');
  } else {
    if (totalCostLine.classList.contains('crossed')) {
      totalCostLine.classList.remove('crossed');
      window.location.assign('#cart-page');
      const newTotalCostLine = document.querySelector('.new_summary__total_line');
      newTotalCostLine?.parentNode?.removeChild(newTotalCostLine);
      const promocodesTable = document.querySelector('.promocodes__table');
      promocodesTable?.parentNode?.removeChild(promocodesTable);
    }
  }
}

function promoLine(
  valueFromInput: string,
  promoInputField: HTMLInputElement,
  summary: HTMLElement,
  totalCostLine: HTMLElement
) {
  const promoDescription = document.createElement('p');
  promoDescription.className = 'promocode__desc';
  let descriptionText = '';
  if (valueFromInput === 'EPM') {
    descriptionText = `EPAM systems - 10%`;
  } else if (valueFromInput === 'RS') {
    descriptionText = `Rolling Scope School - 10%`;
  } else {
    promoInputField.value = '';
  }

  const temp: string[] = JSON.parse(window.localStorage.getItem('online_sotre__promoCodes') as string);

  if (valueFromInput === 'RS' || valueFromInput === 'EPM') {
    promoDescription.innerText = descriptionText;
    if (!temp.includes(valueFromInput)) {
      promoInputField.classList.add('promo');

      promoInputField.disabled = true;
      promoInputField.placeholder = 'add or reject promo code';
      const addPromo = document.createElement('span');
      addPromo.className = 'add_promo__button';
      addPromo.innerText = 'Add';

      addPromo.addEventListener('click', () => {
        promoInputField.classList.remove('promo');
        checkPromoCodes(summary, totalCostLine, promoDescription);
        window.localStorage.setItem('promoDesc', 'false');
        promoInputField.disabled = false;
        promoInputField.placeholder = 'Enter promo code';
        if (!temp.includes(valueFromInput)) {
          temp.push(valueFromInput);
          window.localStorage.setItem('online_sotre__promoCodes', JSON.stringify(temp));
          checkPromoCodes(summary, totalCostLine, promoDescription);
        }
      });
      promoDescription.append(addPromo);
      promoInputField.after(promoDescription);
    }
    promoInputField.value = '';
  }
}

function createProductHeader(
  productsInCart: HTMLElement,
  currentPage: number,
  productsPerPage: number,
  summaryAmount: HTMLElement,
  totalCost: HTMLElement
) {
  let pagesCount = 10;
  const storage: lsObject[] = JSON.parse(window.localStorage.getItem('online_store__storage') as string);

  // pagesCountSet(productsPerPage);

  if (!storage.length) {
    return;
  }
  const productsWrapper = document.createElement('div');
  productsWrapper.className = 'products__wrapper';

  const productsHeader = document.createElement('div');
  productsHeader.className = 'products__header_cart';

  const headerHeadline = document.createElement('h2');
  headerHeadline.className = 'products__header_headline';
  headerHeadline.innerText = 'Products In Cart';
  productsHeader.append(headerHeadline);

  const productField = document.createElement('div');
  productField.className = 'product_list__field';

  const limitBlock = document.createElement('div');
  limitBlock.className = 'products__limit_block';
  const limitText = document.createElement('span');
  limitText.className = 'limit__text';
  limitText.innerText = 'LIMIT:';
  const limitInput = document.createElement('input');
  limitInput.type = 'number';
  limitInput.defaultValue = `${productsPerPage}`;
  limitInput.max = `${storage.length}`;
  limitInput.min = '1';
  limitInput.className = 'limit__input';

  function pagesCountSet(productsPerPage: number) {
    pagesCount = Math.ceil(storage.length / productsPerPage);
    if (currentPage > pagesCount) {
      currentPage = pagesCount;
      currentPageText.innerText = `${currentPage}`;
      createProductList(productsPerPage, currentPage, storage, productField, totalCost, summaryAmount);
    }
    console.log(pagesCount, 'pages');
    return pagesCount;
  }

  limitInput.addEventListener('change', () => {
    productsPerPage = parseInt(limitInput.value, 10);
    pagesCountSet(productsPerPage);
  });
  limitBlock.append(limitText);
  limitBlock.append(limitInput);
  productsHeader.append(limitBlock);

  const pageBlock = document.createElement('div');
  pageBlock.className = 'products__page_block';
  const prevBtn = document.createElement('button');
  prevBtn.className = 'pagination_btn';
  prevBtn.innerText = '<';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'pagination_btn';
  nextBtn.innerText = '>';

  const currentPageText = document.createElement('span');
  currentPageText.innerText = `${currentPage}`;
  currentPageText.className = 'current__page';
  pageBlock.append(prevBtn, currentPageText, nextBtn);
  productsHeader.append(pageBlock);
  productsWrapper.append(productsHeader);
  productsWrapper.append(productField);
  productsInCart.append(productsWrapper);

  prevBtn.addEventListener('click', () => {
    pagesCount = pagesCountSet(productsPerPage);
    if (currentPage > 1) {
      currentPage -= 1;
      currentPageText.innerText = `${currentPage}`;
      createProductList(productsPerPage, currentPage, storage, productField, totalCost, summaryAmount);
    }
  });

  nextBtn.addEventListener('click', () => {
    pagesCount = pagesCountSet(productsPerPage);
    if (currentPage < pagesCount) {
      currentPage += 1;
      currentPageText.innerText = `${currentPage}`;
      createProductList(productsPerPage, currentPage, storage, productField, totalCost, summaryAmount);
    }
  });

  createProductList(productsPerPage, currentPage, storage, productField, totalCost, summaryAmount);
}

function createProductList(
  productsOnPage: number,
  pageNumber: number,
  storage: lsObject[],
  field: HTMLElement,
  totalCost: HTMLElement,
  summaryAmount: HTMLElement
) {
  if (field.hasChildNodes()) {
    while (field.firstChild) {
      field.removeChild(field.firstChild);
    }
  }
  const start: number = (pageNumber - 1) * productsOnPage;
  const end: number = pageNumber * productsOnPage - 1;
  storage.forEach((el, index) => {
    if (index >= start && index <= end) {
      const cartProductWrapper = document.createElement('div');
      cartProductWrapper.className = 'cart_product__wrapper';

      const cartProductDescription = document.createElement('a');
      cartProductDescription.className = 'cart_product__description';
      cartProductDescription.href = `#product-details#${el.itemData.id}`;

      const cartProductStock = document.createElement('div');
      cartProductStock.className = 'cart_product__stock';

      const position = document.createElement('span');
      position.className = 'in_cart__position';
      position.innerText = `${storage.indexOf(el) + 1}`;

      const thumbNail = document.createElement('img');
      thumbNail.className = 'product_list__image';
      thumbNail.src = el.itemData.thumbnail;

      const textDescription = document.createElement('div');
      textDescription.className = 'product_list__text_desc';

      const productTitle = document.createElement('h3');
      productTitle.className = 'product_list__title';
      productTitle.innerText = el.itemData.title;

      const titleUnderline = document.createElement('div');
      titleUnderline.className = 'title__underline';

      const productDesc = document.createElement('div');
      productDesc.className = 'product_list__description';
      productDesc.innerText = el.itemData.description;

      const productRating = document.createElement('div');
      productRating.className = 'product_list__rating';
      productRating.innerText = `Rating: ${el.itemData.rating}`;

      const productDiscount = document.createElement('p');
      productDiscount.className = 'product_list__discount';
      productDiscount.innerText = `Discount: ${el.itemData.discountPercentage}%`;

      textDescription.append(productTitle, titleUnderline, productDesc, productRating, productDiscount);

      const stockAmaount = document.createElement('div');
      stockAmaount.className = 'stock_amount';
      stockAmaount.innerText = `Stock: ${el.itemData.stock}`;

      const stockControls = document.createElement('div');
      stockControls.className = 'stock__controls';

      const increaseAmount = document.createElement('button');
      increaseAmount.className = 'increase_amount__button';
      increaseAmount.innerText = '+';
      increaseAmount.addEventListener('click', () => {
        changeProductsAmount(
          storage.indexOf(el),
          '+',
          productsOnPage,
          pageNumber,
          field,
          productAmount,
          totalCost,
          summaryAmount
        );
      });

      const decreaseAmount = document.createElement('button');
      decreaseAmount.className = 'decrease_amount__button';
      decreaseAmount.innerText = `-`;
      decreaseAmount.addEventListener('click', () => {
        changeProductsAmount(
          storage.indexOf(el),
          '-',
          productsOnPage,
          pageNumber,
          field,
          productAmount,
          totalCost,
          summaryAmount
        );
      });

      const productAmount = document.createElement('span');
      productAmount.className = 'product__amount';
      productAmount.innerText = `${el.amount}`;

      const productPrice = document.createElement('p');
      productPrice.className = 'product__price';
      productPrice.innerText = `\u20ac${el.price.toFixed(2)}`;

      stockControls.append(increaseAmount, productAmount, decreaseAmount);

      cartProductStock.append(stockAmaount, stockControls, productPrice);

      cartProductWrapper.append(cartProductDescription, cartProductStock);
      cartProductDescription.append(position, thumbNail, textDescription);
      field.append(cartProductWrapper);
    }
  });
}

function changeProductsAmount(
  position: number,
  operation: string,
  productsOnPage: number,
  pageNumber: number,
  field: HTMLElement,
  productAmount: HTMLElement,
  totalCost: HTMLElement,
  summaryAmount: HTMLElement
) {
  const storage: lsObject[] = JSON.parse(window.localStorage.getItem('online_store__storage') as string);
  const cartAmount: HTMLElement = document.querySelector('.cart__quantity') as HTMLElement;
  const total: HTMLElement = document.querySelector('.total__amount') as HTMLElement;
  if (operation === '-') {
    storage[position].amount -= 1;
    if (storage[position].amount < 1) {
      storage.splice(position, 1);
      window.localStorage.setItem('online_store__storage', JSON.stringify(storage));
      storageCheck(summaryAmount, totalCost);
      checkLS(total, cartAmount);
      totalAndAmount(summaryAmount, totalCost);

      if (field.hasChildNodes()) {
        createProductList(productsOnPage, pageNumber, storage, field, totalCost, summaryAmount);
      } else {
        createProductList(productsOnPage, pageNumber - 1, storage, field, totalCost, summaryAmount);
      }
    }
    window.localStorage.setItem('online_store__storage', JSON.stringify(storage));
    checkLS(total, cartAmount, storage[position].itemData);
    totalAndAmount(summaryAmount, totalCost);
    productAmount.innerText = `${storage[position].amount}`;
  } else if (operation === '+') {
    storage[position].amount += 1;
    if (storage[position].amount >= storage[position].itemData.stock - 1) {
      storage[position].amount = storage[position].itemData.stock;
    }
    window.localStorage.setItem('online_store__storage', JSON.stringify(storage));
    checkLS(total, cartAmount, storage[position].itemData);
    totalAndAmount(summaryAmount, totalCost);
    productAmount.innerText = `${storage[position].amount}`;
  }
}

export { checkPromoCodes, promoLine, createProductHeader };
