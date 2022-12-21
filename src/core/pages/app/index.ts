import Page from '../../templates/page';
import CartPage from '../cart/index';
import MainPage from '../main/index';
import ProductDetails from '../product-details/index';
import NotFound from '../404/index';

const enum Pages {
  MainPage = 'main-page',
  ProductDetails = 'product-details',
  CartPage = 'cart-page',
}

export default class App {
  private container: HTMLElement;
  private initialPage: MainPage;

  static renderNewPage(pageID: string, className: string) {
    const el = document.querySelectorAll('.main');
    if (el) {
      el.forEach((item) => {
        item.parentNode?.removeChild(item);
        console.log('removed');
      });
    }
    let page: Page | null = null;

    if (pageID === Pages.MainPage) {
      page = new MainPage(pageID, className);
    } else if (pageID === Pages.CartPage) {
      page = new CartPage(pageID, className);
    } else if (pageID === Pages.ProductDetails) {
      page = new ProductDetails(pageID, className);
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
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash, 'main');
    });
  }

  constructor() {
    this.container = document.body;
    this.initialPage = new MainPage('main-page', 'main');
  }

  run() {
    App.renderNewPage('main-page', 'main');
    this.enableRouteChange();
  }
}
