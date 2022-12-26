import Page from '../../templates/page';

export default class CartPage extends Page {
  static TextObject = {
    MainTitle: 'Cart Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  render() {
    this.createPageTitle(CartPage.TextObject.MainTitle);
    const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
