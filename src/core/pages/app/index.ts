import Page from '../../templates/page';
import CartPage from '../cart/index';
import MainPage from '../main/index';
import ProductDetails from '../product-details/index';
import NotFound from '../404/index';

const enum Pages {
  MainPage = ``,
  ProductDetails = 'product-details',
  CartPage = 'cart-page',
}

export default class App {
  private container: HTMLElement;
  private initialPage: MainPage;

  static renderNewPage(pageID: string, className: string, productID?: number) {
    const el = document.querySelectorAll('.main');
    if (el) {
      el.forEach((item) => {
        item.parentNode?.removeChild(item);
      });
    }
    let page: Page | null = null;

    if (pageID === Pages.MainPage) {
      page = new MainPage('main-page', className);
    } else if (pageID === Pages.CartPage) {
      page = new CartPage(pageID, className);
    } else if (pageID === Pages.ProductDetails) {
      if (productID && productID > 0 && productID <= 100) {
        page = new ProductDetails(pageID, className, productID);
      } else {
        page = new NotFound('error-page', className);
      }
    } else {
      page = new NotFound('error-page', className);
    }

    if (page) {
      const pageHTML = page.render();
      const footer = document.querySelector('footer');
      footer?.insertAdjacentElement('beforebegin', pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1).split('#')[0];
      const productID = Number(window.location.hash.slice(1).split('#')[1]);

      App.renderNewPage(hash, 'main', productID);
    });
  }

  constructor() {
    this.container = document.body;
    this.initialPage = new MainPage('main-page', 'main');
  }

  run() {
    App.renderNewPage('', 'main');
    this.enableRouteChange();
  }
}
