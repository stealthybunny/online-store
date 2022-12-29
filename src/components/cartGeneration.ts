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

function checkPromoCodes(totalCostLine: HTMLElement) {
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
    console.log('promo est');
    totalCostLine.classList.add('crossed');

    const newTotalCostLine = document.createElement('p');
    newTotalCostLine.className = 'summary__total_line';
    newTotalCostLine.innerText = 'Total: ';

    const newTotalCost = document.createElement('span');
    newTotalCost.className = 'summary__total_cost';
    newTotalCost.innerText = `${newCost} \u20ac`;

    newTotalCostLine.append(newTotalCost);
    totalCostLine.after(newTotalCostLine);
  }
}

export { storageCheck, checkPromoCodes };
