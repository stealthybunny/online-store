import Page from '../../templates/page';
import getData from '../../../components/getData';
import { selectOptions } from '../../../types';

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

    const filterButtons = document.createElement('div');
    filterButtons.className = 'filter__buttons';

    const resetButton = document.createElement('button');
    resetButton.className = 'reset__button';
    resetButton.classList.add('filter__button');
    resetButton.innerText = 'Reset';
    resetButton.addEventListener('click', () => {
      window.localStorage.removeItem('productsArr');
      window.location.assign('#main');
    });

    const copyLink = document.createElement('button');
    copyLink.className = 'copy-link__button';
    copyLink.innerText = 'Copy link';
    copyLink.classList.add('filter__button');
    copyLink.addEventListener('click', () => {
      const tempInput = document.createElement('textarea');

      tempInput.style.fontSize = '12pt';
      tempInput.style.border = '0';
      tempInput.style.padding = '0';
      tempInput.style.margin = '0';
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      tempInput.setAttribute('readonly', '');

      tempInput.value = window.location.href;

      copyLink.parentNode?.appendChild(tempInput);

      tempInput.select();
      tempInput.setSelectionRange(0, 99999);

      document.execCommand('copy');

      tempInput.parentNode?.removeChild(tempInput);
      copyLink.innerText = 'Link copied!';
      setTimeout(() => {
        copyLink.innerText = 'Copy link';
      }, 2000);
    });

    filterButtons.append(resetButton, copyLink);

    const fileterByCategory = document.createElement('div');
    fileterByCategory.className = 'filter__by-catgory';
    fileterByCategory.classList.add('filter__block');

    const blockHead = document.createElement('div');
    blockHead.className = 'block__head';

    const blockHeadliner = document.createElement('h3');
    blockHeadliner.className = 'block__headliner';
    blockHeadliner.innerText = 'Category';

    const blockFieldCat = document.createElement('div');
    blockFieldCat.className = 'block__field';
    blockFieldCat.classList.add('categories');

    blockHead.append(blockHeadliner);
    fileterByCategory.append(blockHead, blockFieldCat);

    const filterByBrand = document.createElement('div');
    filterByBrand.className = 'filter__by-brand';
    filterByBrand.classList.add('filter__block');

    const secondBlockHead = document.createElement('div');
    secondBlockHead.className = 'block__head';

    const secondBlockHeadliner = document.createElement('h3');
    secondBlockHeadliner.className = 'block__headliner';
    secondBlockHeadliner.innerText = 'Brand';

    const blockFieldBrand = document.createElement('div');
    blockFieldBrand.className = 'block__field';
    blockFieldBrand.classList.add('brands');

    secondBlockHead.append(secondBlockHeadliner);
    filterByBrand.append(secondBlockHead, blockFieldBrand);

    const filterByPrice = document.createElement('div');
    filterByPrice.className = 'filter__by-price';
    filterByPrice.classList.add('filter__block');

    const priceHead = document.createElement('div');
    priceHead.className = 'block__head';

    const priceHeadliner = document.createElement('h3');
    priceHeadliner.className = 'block__headliner';
    priceHeadliner.innerText = 'Price';

    const priceField = document.createElement('div');
    priceField.className = 'selector__filed';

    priceHead.append(priceHeadliner);
    filterByPrice.append(priceHead, priceField);

    const filterByStock = document.createElement('div');
    filterByStock.className = 'filter__by-price';
    filterByStock.classList.add('filter__block');

    const stockHead = document.createElement('div');
    stockHead.className = 'block__head';

    const stockHeadliner = document.createElement('h3');
    stockHeadliner.className = 'block__headliner';
    stockHeadliner.innerText = 'Stock';

    const stockField = document.createElement('div');
    stockField.className = 'selector__filed';

    stockHead.append(stockHeadliner);
    filterByStock.append(stockHead, stockField);

    filterSection.append(filterButtons, fileterByCategory, filterByBrand, filterByPrice, filterByStock);

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

    // selectBar.addEventListener('change', () => {
    //   console.log(selectBar.value);
    // });

    selectBar.append(titleOption);

    const optionsEntries = Object.entries(selectOptions);
    optionsEntries.forEach((el) => {
      if (el[0] !== 'discount_ASC' && el[0] !== 'discount_DESC') {
        const option = document.createElement('option');
        option.className = 'select_bar__option';
        option.value = el[0];
        option.innerText = el[1];
        selectBar.append(option);
      }
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
    small.addEventListener('click', () => {
      if (window.localStorage.getItem('size') !== 'small') {
        big.style.background = '#79b257';
        small.style.background = 'gray';
        window.localStorage.setItem('size', 'small');
        getData(searchInput, foundValue);
      }
    });

    const big = document.createElement('div');
    big.className = 'apperiance__big';
    big.addEventListener('click', () => {
      if (window.localStorage.getItem('size') !== 'big') {
        big.style.background = 'gray';
        small.style.background = '#79b257';
        window.localStorage.setItem('size', 'big');
        getData(searchInput, foundValue);
      }
    });

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
