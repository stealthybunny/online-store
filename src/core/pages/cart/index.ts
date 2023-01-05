import Page from '../../templates/page';
import createPopap from '../../../components/modal';
import './cart.css';
import { storageCheck, promoLine, checkPromoCodes, createProductHeader } from '../../../components/cartGeneration';

export default class CartPage extends Page {
  static TextObject = {
    MainTitle: 'Cart Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  private pageGeneration() {
    window.localStorage.setItem('promoDesc', 'false');
    if (!window.localStorage.getItem('online_sotre__promoCodes')) {
      const empty: string[] = [];
      window.localStorage.setItem('online_sotre__promoCodes', JSON.stringify(empty));
    }

    const cartWrapper = document.createElement('div');
    cartWrapper.className = 'cart__wrapper';

    const productsInCart = document.createElement('div');
    productsInCart.className = 'cart__products';

    // function createSummarySection(cartWrapper: HTMLElement) {

    // }

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

    this.container.append(cartWrapper);
    cartWrapper.append(productsInCart);
    cartWrapper.append(summary);
    summary.prepend(summaryHeadline);
    productsLine.append(productsAmount);
    totalCostLine.append(totalCost);
    summary.append(productsLine);
    summary.append(totalCostLine);

    createProductHeader(productsInCart, 1, 3, productsAmount, totalCost);
    storageCheck(productsAmount, totalCost);
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
    this.createPopapBtn(summary);
  }

  private createPopapBtn(element: HTMLElement) {
    const btnWrap = document.createElement('div');
    const btn = document.createElement('button');
    btnWrap.className = 'btn__wrap';
    btn.innerHTML = 'Buy';
    btn.className = 'bay__btn';
    btnWrap.appendChild(btn);
    element.appendChild(btnWrap);
    createPopap(this.container, btn);
    if (localStorage.getItem('clickButton') === 'true') {
      btn.click();
    }
    localStorage.setItem('clickButton', 'false');
  }

  render() {
    this.pageGeneration();
    return this.container;
  }
}
