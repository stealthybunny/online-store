import Page from '../../templates/page';
import createPopap from '../../../components/modal';
import './cart.css';
import { createSummarySection } from '../../../components/summaryCreation';
// import { storageCheck, promoLine, checkPromoCodes, createProductHeader } from '../../../components/cartGeneration';

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

    this.container.append(cartWrapper);
    cartWrapper.append(productsInCart);

    const summary = createSummarySection(cartWrapper, productsInCart);

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
