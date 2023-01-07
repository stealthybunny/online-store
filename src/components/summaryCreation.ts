import { promoLine, checkPromoCodes, createProductHeader } from '../components/cartGeneration';

function totalAndAmount(summaryAmount: HTMLElement, totalCost: HTMLElement) {
  if (window.localStorage.getItem('online_store__total') !== '') {
    totalCost.innerText = window.localStorage.getItem('online_store__total') as string;
  } else {
    totalCost.innerText = '0.00 \u20ac';
  }

  if (window.localStorage.getItem('online_store__amount') !== '') {
    summaryAmount.innerText = window.localStorage.getItem('online_store__amount') as string;
  } else {
    summaryAmount.innerText = '0';
  }
}

function createSummarySection(cartWrapper: HTMLElement, productsInCart: HTMLElement) {
  const summary = document.createElement('div');
  summary.className = 'cart__summary';

  const summaryHeadline = document.createElement('h2');
  summaryHeadline.className = 'cart__summary_headline';
  summaryHeadline.innerText = 'Summary';

  const productsLine = document.createElement('p');
  productsLine.className = 'summary__products_line';
  productsLine.innerText = 'Products: ';

  const productsAmount = document.createElement('span');
  productsAmount.className = 'summary__products_amount';

  const totalCostLine = document.createElement('p');
  totalCostLine.className = 'summary__total_line';
  totalCostLine.innerText = 'Total: ';

  const totalCost = document.createElement('span');
  totalCost.className = 'summary__total_cost';

  cartWrapper.append(summary);
  summary.prepend(summaryHeadline);
  productsLine.append(productsAmount);
  totalCostLine.append(totalCost);
  summary.append(productsLine);
  summary.append(totalCostLine);

  createProductHeader(productsInCart, 1, 3, productsAmount, totalCost);
  totalAndAmount(productsAmount, totalCost);
  checkPromoCodes(summary, totalCostLine);

  if (JSON.parse(window.localStorage.getItem('online_sotre__promoCodes') as string)?.length !== 0) {
    const promoTable = document.createElement('div');
    promoTable.className = 'applied_codes';

    const promoHeadline = document.createElement('h3');
    promoHeadline.innerText = 'Applied Codes';
    promoHeadline.className = 'applied_codes__headline';
  }

  const promoInputField = document.createElement('input');
  promoInputField.className = 'promocode__input';
  promoInputField.type = 'search';
  promoInputField.placeholder = 'Enter promo code';
  promoInputField.addEventListener('change', () => {
    const valueFromInput: string = promoInputField.value.toUpperCase();
    promoLine(valueFromInput, promoInputField, summary, totalCostLine);
  });
  const promoTip = document.createElement('p');
  promoTip.className = 'promocode__tip';
  promoTip.innerText = `Promo for test: 'EPM', 'RS'.`;

  summary.append(promoInputField);
  summary.append(promoTip);
  return summary;
}

export { createSummarySection, totalAndAmount };
