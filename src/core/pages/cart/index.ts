import Page from '../../templates/page';
import createPopap from '../../../components/modal';

export default class CartPage extends Page {
  static TextObject = {
    MainTitle: 'Cart Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  private createPopapBtn() {
    const btnWrap = document.createElement('div');
    const btn = document.createElement('button');
    btnWrap.className = 'btn__wrap';
    btn.innerHTML = 'Buy';
    btn.className = 'bay__btn';
    btnWrap.appendChild(btn);
    this.container.appendChild(btnWrap);
    createPopap(this.container, btn);
    if (localStorage.getItem('clickButton') === 'true') {
      btn.click();
    }
    localStorage.setItem('clickButton', 'false');
  }

  render() {
    this.createPageTitle(CartPage.TextObject.MainTitle);
    const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
    this.container.append(title);
    this.createPopapBtn();
    return this.container;
  }
}
