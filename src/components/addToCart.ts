import { lsObject, productDatum } from '../types';

function checkLS(total: HTMLElement, cartAmount: HTMLElement, el?: productDatum, addOrDropBtn?: HTMLElement) {
  const storage: lsObject[] = JSON.parse(window.localStorage.getItem('online_store__storage') as string);
  if (!storage.length && !el) {
    total.innerText = `0.00 \u20ac`;
    cartAmount.innerText = `0`;
    window.localStorage.removeItem('online_store__total');
    window.localStorage.setItem('online_store__total', `0.00 \u20ac`);
    window.localStorage.removeItem('online_store__amount');
    window.localStorage.setItem('online_store__amount', `0`);
  } else {
    const data = el as productDatum;
    const storageKeys = storage.map((el) => el.id);
    let cartTotal = 0;
    let amount = 0;
    storage.forEach((el) => {
      cartTotal += el.price * el.amount;
      amount += el.amount;
    });
    total.innerText = `${cartTotal}.00 \u20ac`;
    cartAmount.innerText = `${amount}`;
    window.localStorage.removeItem('online_store__total');
    window.localStorage.setItem('online_store__total', `${cartTotal}.00 \u20ac`);
    window.localStorage.removeItem('online_store__amount');
    window.localStorage.setItem('online_store__amount', `${amount}`);
    if (addOrDropBtn) {
      if (storageKeys.includes(data.id)) {
        addOrDropBtn.innerText = 'Drop from Cart';
        addOrDropBtn.classList.add('pushed');
      } else {
        addOrDropBtn.innerText = 'Add to Cart';
        addOrDropBtn.classList.remove('pushed');
      }
      cartAmount.innerText = `${amount}`;
    }
  }
}

function addToCartListener(total: HTMLElement, cartAmount: HTMLElement, el: productDatum, addOrDropBtn?: HTMLElement) {
  if (addOrDropBtn?.classList.contains('pushed')) {
    addOrDropBtn.classList.remove('pushed');
  } else {
    addOrDropBtn?.classList.add('pushed');
  }
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
    checkLS(total, cartAmount, el, addOrDropBtn);
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
    checkLS(total, cartAmount, el, addOrDropBtn);
    cartAmount.innerText = `${storage.length}`;
  }
}

export { checkLS, addToCartListener };
