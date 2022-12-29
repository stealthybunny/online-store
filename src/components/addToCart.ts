import { lsObject, productDatum } from '../types';

function checkLS(total: HTMLElement, cartAmount: HTMLElement, addOrDropBtn: HTMLElement, el: productDatum) {
  const storage: lsObject[] = JSON.parse(window.localStorage.getItem('online_store__storage') as string);
  const storageKeys = storage.map((el) => el.id);
  let cartTotal = 0;
  // let withDiscount = 0;
  storage.forEach((el) => {
    cartTotal += el.price;
    // withDiscount = withDiscount + (el.price *(100 - el.discount)) / 100;
  });
  total.innerText = `${cartTotal}.00 \u20ac`;
  window.localStorage.removeItem('online_store__total');
  window.localStorage.setItem('online_store__total', `${cartTotal}.00 \u20ac`);
  // window.localStorage.removeItem('online_store__total_discount');
  // window.localStorage.setItem('online_store__total_discount', `${withDiscount}`)
  if (storageKeys.includes(el.id)) {
    addOrDropBtn.innerText = 'Drop from Cart';
  } else {
    addOrDropBtn.innerText = 'Add to Cart';
  }
  cartAmount.innerText = `${storage.length}`;
}

function addToCartListener(total: HTMLElement, cartAmount: HTMLElement, addOrDropBtn: HTMLElement, el: productDatum) {
  const storage: lsObject[] = JSON.parse(window.localStorage.getItem('online_store__storage') as string);
  const storageKeys = storage.map((el) => el.id);
  if (storageKeys.includes(el.id)) {
    window.localStorage.removeItem('online_store__storage');
    storage.forEach((item, index) => {
      if (item.id === el.id) {
        storage.splice(index, 1);
      }
    });
    window.localStorage.setItem('online_store__storage', JSON.stringify(storage));
    checkLS(total, cartAmount, addOrDropBtn, el);
    cartAmount.innerText = `${storage.length}`;
  } else {
    window.localStorage.removeItem('online_store__storage');
    const temp = {
      id: el.id,
      amount: 1,
      price: el.price,
      discount: el.discountPercentage,
      itemData: el,
    };
    storage.push(temp);
    window.localStorage.setItem('online_store__storage', JSON.stringify(storage));
    checkLS(total, cartAmount, addOrDropBtn, el);
    cartAmount.innerText = `${storage.length}`;
  }
}

export { checkLS, addToCartListener };
