import MainPage from '../main/index';

export default class App {
  private container: HTMLElement;
  private initialPage: MainPage;

  constructor() {
    this.container = document.createElement('main');
    this.initialPage = new MainPage('main-page');
  }

  run() {
    const footer = document.querySelector('footer');
    const mainPageHTML = this.initialPage.render();
    footer?.insertAdjacentElement('beforebegin', mainPageHTML);
    // return this.container;
  }
}
