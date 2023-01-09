import Page from '../../templates/page';
import CartPage from '../cart/index';
import MainPage from '../main/index';
import ProductDetails from '../product-details/index';
import NotFound from '../404/index';

const enum Pages {
  MainPage = 'main',
  ProductDetails = 'product-details',
  CartPage = 'cart-page',
}

export default class App {
  private container: HTMLElement;
  private initialPage: MainPage;

  static renderNewPage(pageID: string, className: string, productID?: number) {
    console.log('pageID', pageID);
    const el = document.querySelectorAll('.main');
    if (el) {
      el.forEach((item) => {
        item.parentNode?.removeChild(item);
      });
    }
    let page: Page | null = null;

    if (pageID === Pages.MainPage || pageID === '') {
      // window.location.assign('#main');
      // if (sortID) {
      //   console.log('category');
      // }
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
    function updateState() {
      const urlString = window.location.hash.slice(1).split('#')[0];
      const hash = urlString.slice(0).split('?')[0];
      const parameters = urlString.slice(1).split('?')[1];
      console.log(parameters);
      // console.log('hash:', hash)
      //   console.log('query:', parameters)
      //   const productID = Number(window.location.hash.slice(1).split('#')[1]);
      //   // const sortID = window.location.search;
      //   // console.log(sortID);
      //   // console.log(productID);
      //   App.renderNewPage(hash, 'main', productID);
      const productID = Number(window.location.hash.slice(1).split('#')[1]);

      if (!parameters) {
        console.log('hash:', hash);
        console.log('query:', parameters);
        // const sortID = window.location.search;
        // console.log(sortID);
        // console.log(productID);
        App.renderNewPage(hash, 'main', productID);
      } else {
        App.renderNewPage(hash, 'main', productID);
      }
    }
    window.addEventListener('hashchange', () => {
      updateState();
    });
    window.addEventListener('load', () => {
      updateState();
    });
  }

  constructor() {
    this.container = document.body;
    this.initialPage = new MainPage('main-page', 'main');
  }

  run() {
    App.renderNewPage('#main', 'main');
    this.enableRouteChange();
  }
}
