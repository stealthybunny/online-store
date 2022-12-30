import { JSONresponse, productDatum } from '../../../types';
import Page from '../../templates/page';
import './product-details.css';
import { addToCartListener, checkLS } from '../../../components/addToCart';
import { lsObject } from '../../../types';
// import createPopap from '../../../modal';

export default class ProductDetails extends Page {
  static TextObject = {
    MainTitle: 'Product Details',
  };

  productID: number;

  constructor(id: string, className: string, productID: number) {
    super(id, className);
    this.productID = productID;
  }

  private createProductPageElements(datum: productDatum) {
    const showPath = document.createElement('p');
    showPath.className = 'show-path';
    this.container.append(showPath);
    showPath.innerText = `STORE >> ${datum.category.toUpperCase()} >> ${datum.brand.toUpperCase()} >> ${datum.title.toUpperCase()}`;

    const producDescription = document.createElement('div');
    producDescription.className = 'product-description';
    this.container.append(producDescription);

    const productTitle = document.createElement('div');
    productTitle.className = 'product-title';
    producDescription.append(productTitle);

    const productTitleText = document.createElement('h1');
    productTitleText.className = 'product-title_text';
    productTitleText.innerText = datum.title;
    productTitle.append(productTitleText);

    const productData = document.createElement('div');
    productData.className = 'product-data';
    producDescription.append(productData);

    const productPhotos = document.createElement('div');
    productPhotos.className = 'product-photos';
    productData.append(productPhotos);

    const slides = document.createElement('div');
    slides.className = 'slides';
    productPhotos.append(slides);

    const mainPhotoContainer = document.createElement('div');
    mainPhotoContainer.className = 'main-photo__container';
    productPhotos.append(mainPhotoContainer);

    const mainPhoto = document.createElement('img');
    mainPhoto.className = 'main-photo';
    mainPhotoContainer.append(mainPhoto);

    datum.images.forEach((el) => {
      console.log(el);
      const img = document.createElement('img');
      img.className = 'small-img';
      img.src = el;
      slides.append(img);
      img.addEventListener('click', () => {
        mainPhoto.src = el;
        console.log('el!');
      });
    });

    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    productData.append(productInfo);

    const descriptionValues: string[] = [
      datum.description,
      `${datum.discountPercentage}%`,
      `${datum.rating}`,
      `${datum.stock}`,
      datum.brand,
      datum.category,
    ];
    const descriptionParametars: string[] = [
      'Description: ',
      'Discount Percentage: ',
      'Rating: ',
      'Stock: ',
      'Brand: ',
      'Category: ',
    ];

    for (let i = 0; i < 6; i++) {
      const infoItem = document.createElement('div');
      infoItem.className = 'info-item';
      const infoHead = document.createElement('h3');
      infoHead.className = 'info-head';
      const infoText = document.createElement('p');
      infoText.className = 'info-text';

      infoItem.append(infoHead);
      infoItem.append(infoText);
      infoHead.innerText = descriptionParametars[i];
      infoText.innerText = descriptionValues[i];
      productInfo.append(infoItem);
    }

    const productBuy = document.createElement('div');
    productBuy.className = 'product-buy';
    productData.append(productBuy);

    const priceTag = document.createElement('p');
    priceTag.className = 'price-tag';
    productBuy.append(priceTag);
    priceTag.innerText = `\u20ac${datum.price}`;

    const buyBtn = document.createElement('button');
    buyBtn.className = 'product-details__buy';
    productBuy.append(buyBtn);
    buyBtn.innerText = 'BUY NOW';
    buyBtn.addEventListener('click', () => {
      const cartAmount: HTMLElement = document.querySelector('.cart__quantity') as HTMLElement;
      const total: HTMLElement = document.querySelector('.total__amount') as HTMLElement;
      addToCartListener(total, cartAmount, datum);
      window.location.assign('#cart-page');
      localStorage.setItem('clickButton', 'true');
    });

    const cartAmount: HTMLElement = document.querySelector('.cart__quantity') as HTMLElement;
    const total: HTMLElement = document.querySelector('.total__amount') as HTMLElement;

    const cartBtn = document.createElement('button');
    cartBtn.className = 'product-details__to-cart';
    productBuy.append(cartBtn);
    checkLS(total, cartAmount, datum, cartBtn);
    cartBtn.addEventListener('click', () => {
      addToCartListener(total, cartAmount, datum, cartBtn);
    });
  }

  private createProducDesription(productID: number) {
    fetch('https://dummyjson.com/products?limit=100')
      .then((response) => {
        return response.json();
      })
      .then((data: JSONresponse) => {
        const datum: productDatum = data.products[productID];
        this.createProductPageElements(datum);
      });
  }

  render() {
    this.createPageTitle(ProductDetails.TextObject.MainTitle);
    this.createProducDesription(this.productID - 1);
    return this.container;
  }
}
