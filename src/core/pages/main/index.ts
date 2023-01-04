import Page from '../../templates/page';
import getData from '../../../components/getData';

export default class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Online Store',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  private createPageContent() {
    this.container.innerHTML = `
      <aside class="filter__section">
        <div class="filter__buttons">
          <button class="reset__button filter__button">Reset</button>
          <button class="copy-link__button filter__button">Copy Link</button>
        </div>
        <div class="filter__by-catgory filter__block">
          <div class="block__head">
            <h3 class="block__headliner">Category</h3>
          </div>
          <div class="block__field categories"></div>
        </div>
        <div class="filter__by-brand filter__block">
          <div class="block__head">
            <h3 class="block__headliner">Brand</h3>
          </div>
          <div class="block__field brands"></div>
        </div>
        <div class="filter__by-price filter__block">
          <div class="block__head">
            <h3 class="block__headliner">Price</h3>
          </div>
          <div class="selector__filed"></div>
        </div>
        <div class="filter__by-stock filter__block">
          <div class="block__head">
            <h3 class="block__headliner">Stock</h3>
          </div>
          <div class="selector__filed"></div>
        </div>
      </aside>
      <div class="products__block">
        <div class="products__header"></div>
        <div class="products__field"></div>
      </div>
    `;
  }

  private createHeaderProducts() {
    const headerMain = this.container.querySelector('.products__header');
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'search';
    headerMain?.append(searchInput);
  }

  render() {
    this.createPageTitle(MainPage.TextObject.MainTitle);
    this.createPageContent();
    // this.createHeaderProducts();
    getData();
    return this.container;
  }
}
