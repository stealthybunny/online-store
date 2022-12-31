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

export { storageCheck, checkPromoCodes };
