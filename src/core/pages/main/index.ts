import Page from '../../templates/page';
import getData from '../../../components/getData';
import { selectOptions } from '../../../types';
import { addSortingOptionToUrl } from './urlInteractions';

export default class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Online Store',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  private createPageContent() {
    const filterSection = document.createElement('aside');
    filterSection.className = 'filter__section';
    filterSection.innerHTML = `
    <div class="filter__buttons">
          <a href="#main" class="reset__button filter__button">Reset</a>
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
    `;

    const productsBlock = document.createElement('div');
    productsBlock.className = 'products__block';

    this.createHeaderProducts(productsBlock);
    this.container.append(filterSection, productsBlock);
  }

  createHeaderProducts(productsBlock: HTMLElement) {
    const productsHeader = document.createElement('div');
    productsHeader.className = 'products__header';

    const productsField = document.createElement('div');
    productsField.className = 'products__field';

    productsBlock.append(productsHeader, productsField);

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search product';
    searchInput.className = 'search';

    const selectBar = document.createElement('select');
    selectBar.className = 'header__select_bar';
    const titleOption = document.createElement('option');
    titleOption.disabled = true;
    titleOption.innerText = 'Sort options:';
    titleOption.value = 'sort-title';
    titleOption.selected = true;

    selectBar.addEventListener('change', () => {
      console.log(selectBar.value);
      addSortingOptionToUrl(selectBar.value);
    });

    selectBar.append(titleOption);

    const optionsEntries = Object.entries(selectOptions);
    optionsEntries.forEach((el) => {
      const option = document.createElement('option');
      option.className = 'select_bar__option';
      option.value = el[0];
      option.innerText = el[1];
      selectBar.append(option);
    });

    const found = document.createElement('span');
    found.className = 'found__text';
    found.innerText = 'Found: ';

    const foundValue = document.createElement('span');
    foundValue.className = 'found__value';
    found.append(foundValue);

    const chooseApperiance = document.createElement('div');
    chooseApperiance.className = 'choose_apperiance';

    const small = document.createElement('div');
    small.className = 'apperiance__small';

    const big = document.createElement('div');
    big.className = 'apperiance__big';

    for (let i = 0; i < 25; i += 1) {
      const smallPiece = document.createElement('div');
      smallPiece.style.width = '4px';
      smallPiece.style.height = '4px';
      smallPiece.style.backgroundColor = 'white';
      small.append(smallPiece);
    }

    for (let i = 0; i < 9; i += 1) {
      const bigPiece = document.createElement('div');
      bigPiece.style.width = '7px';
      bigPiece.style.height = '7px';
      bigPiece.style.backgroundColor = 'white';
      big.append(bigPiece);
    }

    chooseApperiance.append(small, big);

    productsHeader.append(selectBar, found, searchInput, chooseApperiance);

    getData(searchInput, foundValue);
  }

  render() {
    this.createPageTitle(MainPage.TextObject.MainTitle);
    this.createPageContent();
    return this.container;
  }
}
