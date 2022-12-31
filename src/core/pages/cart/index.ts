import Page from '../../templates/page';
import createPopap from '../../../components/modal';
import './cart.css';
// import { lsObject } from '../../../types';
import { storageCheck } from '../../../components/cartGeneration';
import { checkPromoCodes } from '../../../components/cartGeneration';

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

    // const promoCodes: string[] = JSON.parse(window.localStorage.getItem('online_sotre__promoCodes') as string);
    const cartWrapper = document.createElement('div');
    cartWrapper.className = 'cart__wrapper';

    const productsInCart = document.createElement('div');
    productsInCart.className = 'cart__products';

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
      const promoDescription = document.createElement('p');
      promoDescription.className = 'promocode__desc';
      if (valueFromInput === 'EPM') {
        promoDescription.innerText = `EPAM systems - 10%`;
      } else {
        promoDescription.innerText = `Rolling Scope School - 10%`;
      }
      const addPromo = document.createElement('span');
      addPromo.className = 'add_promo__button';
      addPromo.innerText = 'Add';
      promoInputField.disabled = true;
      addPromo.addEventListener('click', () => {
        checkPromoCodes(summary, totalCostLine, promoDescription);
        window.localStorage.setItem('promoDesc', 'false');
        promoInputField.disabled = false;
      });
      promoDescription.append(addPromo);

      if (valueFromInput === 'RS' || valueFromInput === 'EPM') {
        const temp: string[] = JSON.parse(window.localStorage.getItem('online_sotre__promoCodes') as string);
        if (window.localStorage.getItem('promoDesc') === 'true') {
          promoDescription.parentNode?.removeChild(promoDescription);
          window.localStorage.setItem('promoDesc', 'false');
        } else {
          promoInputField.after(promoDescription);
          window.localStorage.setItem('promoDesc', 'true');
        }

        if (!temp.includes(valueFromInput)) {
          temp.push(valueFromInput);
          console.log('temp', temp);
          window.localStorage.setItem('online_sotre__promoCodes', JSON.stringify(temp));
        }
        promoInputField.value = '';
      } else {
        console.log(promoDescription);
        promoDescription.parentNode?.removeChild(promoDescription);
      }
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
