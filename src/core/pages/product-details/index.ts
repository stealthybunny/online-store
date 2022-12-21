import Page from '../../templates/page';

export default class ProductDetails extends Page {
  static TextObject = {
    MainTitle: 'Product Details',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  render() {
    this.createPageTitle(ProductDetails.TextObject.MainTitle);
    const title = this.createHeaderTitle(ProductDetails.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
