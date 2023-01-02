import { lsObject } from '../types';

function getStorage() {
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
  const results: number[] = getStorage();
  productsAmount.innerText = ` ${results[0]}`;
  totalCost.innerText = ` ${results[1]}.00 \u20ac`;
}

function checkPromoCodes(summary: HTMLElement, totalCostLine: HTMLElement, promoDescription?: HTMLElement) {
  if (promoDescription) {
    promoDescription.parentNode?.removeChild(promoDescription);
  }
  const existingTable = document.querySelector('.promocodes__table');
  existingTable?.parentNode?.removeChild(existingTable);
  const results = getStorage();
  let percent = 1;
  const promoCodes: string[] = JSON.parse(window.localStorage.getItem('online_sotre__promoCodes') as string);

  console.log(promoCodes);
  if (promoCodes.includes('RS')) {
    percent -= 0.1;
  }
  if (promoCodes.includes('EPM')) {
    percent -= 0.1;
  }
  const newCost = percent * results[1];
  console.log(percent);

  if (percent !== 1) {
    if (!totalCostLine.classList.contains('crossed')) {
      console.log('net');
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
      console.log('est');
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
  console.log('parent', promoDescription.parentNode);

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
          console.log('temp', temp);
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

function createProductHeader(productsInCart: HTMLElement, currentPage: number, productsPerPage: number) {
  let pagesCount = 10;
  const storage: lsObject[] = JSON.parse(window.localStorage.getItem('online_store__storage') as string);

  function pagesCountSet(productsPerPage: number) {
    pagesCount = Math.ceil(storage.length / productsPerPage);
    if (currentPage > pagesCount) {
      currentPage = pagesCount;
      currentPageText.innerText = `${currentPage}`;
      createProductList(productsPerPage, currentPage, storage);
    }
    return pagesCount;
  }
  pagesCountSet(productsPerPage);

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
  prevBtn.addEventListener('click', () => {
    pagesCount = pagesCountSet(productsPerPage);
    if (currentPage > 1) {
      currentPage -= 1;
      currentPageText.innerText = `${currentPage}`;
      createProductList(productsPerPage, currentPage, storage);
    }
  });
  const nextBtn = document.createElement('button');
  nextBtn.className = 'pagination_btn';
  nextBtn.innerText = '>';
  nextBtn.addEventListener('click', () => {
    pagesCount = pagesCountSet(productsPerPage);
    if (currentPage < pagesCount) {
      currentPage += 1;
      currentPageText.innerText = `${currentPage}`;
      createProductList(productsPerPage, currentPage, storage);
    }
  });

  const currentPageText = document.createElement('span');
  currentPageText.innerText = `${currentPage}`;
  currentPageText.className = 'current__page';
  pageBlock.append(prevBtn, currentPageText, nextBtn);
  productsHeader.append(pageBlock);
  productsWrapper.append(productsHeader);
  productsInCart.append(productsWrapper);
}

function createProductList(productsOnPage: number, pageNumber: number, storage: lsObject[]) {
  const start: number = (pageNumber - 1) * productsOnPage;
  const end: number = pageNumber * productsOnPage - 1;
  console.log(start, end);
  const products: lsObject[] = [];
  storage.forEach((el, index) => {
    if (index >= start && index <= end) {
      console.log(index);
      products.push(el);
    }
  });
  console.log(products);
}

export { storageCheck, checkPromoCodes, promoLine, createProductHeader };
