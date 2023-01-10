import { JSONresponse } from '../types';

import { createList, createProducts, createRange } from './createPageElements';

export default function getData(searchInput: HTMLInputElement, foundValue: HTMLSpanElement) {
  // console.log('getData');
  fetch('https://dummyjson.com/products?limit=100')
    .then((response) => {
      return response.json();
    })
    .then((data: JSONresponse) => {
      const products = data.products;

      const categorQuantity: string[] = [];
      const brandQuantity: string[] = [];

      const categories: string[] = [];
      const brands: string[] = [];
      const priceArr: number[] = [];
      const stockArr: number[] = [];

      products.forEach((product) => {
        if (!priceArr.includes(product.price)) {
          priceArr.push(product.price);
        }
        if (!stockArr.includes(product.stock)) {
          stockArr.push(product.stock);
        }
        if (!categories.includes(product.category)) {
          categories.push(product.category);
        }
        if (!brands.includes(product.brand)) {
          brands.push(product.brand);
        }
      });

      // ----------------------------- Функция создает строку "(КОЛИЧЕСТВО\КОЛИЧЕСТВО)" для категорий ------------------------
      const countCategory = (categ: string) => {
        let k = 0;
        for (let i = 0; i < products.length; i++) {
          if (products[i].category === categ) {
            k = k + 1;
          }
        }
        return `(${k}/${k})`;
      };

      // ----------------------------- Функция создает строку "(КОЛИЧЕСТВО\КОЛИЧЕСТВО)" для брендов ------------------------
      const countBrand = (brand: string) => {
        let k = 0;
        for (let i = 0; i < products.length; i++) {
          if (products[i].brand === brand) {
            k = k + 1;
          }
        }
        return `(${k}/${k})`;
      };

      categories.forEach((categ) => {
        categorQuantity.push(countCategory(categ));
      });
      brands.forEach((bran) => {
        brandQuantity.push(countBrand(bran));
      });
      let newProdCategory = [...products];
      let newProdBrand = [...products];
      let finishArr = [...products];
      let newNewProd: string[] = [];
      let categorySearch: string[] = [];
      let brandSearch: string[] = [];
      createList(categories, categorQuantity, document.querySelector('.categories') as HTMLTemplateElement);
      createList(brands, brandQuantity, document.querySelector('.brands') as HTMLTemplateElement);

      createRange(document.querySelectorAll('.selector__filed')[0] as HTMLTemplateElement, priceArr);
      createRange(document.querySelectorAll('.selector__filed')[1] as HTMLTemplateElement, stockArr);
      createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement, foundValue);

      const inputCheckbox = document.querySelectorAll('input');
      const filterSection = document.querySelector('.filter__section');
      const selectBar = document.querySelector('.header__select_bar');
      const option = document.querySelectorAll('.select_bar__option');

      const leftBorder = document.querySelectorAll('.left__border');
      const rightBorder = document.querySelectorAll('.right__border');

      const filterFunc = () => {
        newNewProd = [];
        let checkedYesOrNot = false;
        const myParams = new URLSearchParams(window.location.search);
        newProdCategory = [...products];
        newProdBrand = [...products];

        categorySearch = [];
        finishArr = [];
        brandSearch = [];
        inputCheckbox.forEach((el) => {
          if (el.checked && el.classList.contains('input__filter')) {
            checkedYesOrNot = true;

            if (el.closest('.filter__by-catgory')) {
              categorySearch.push(el.id);

              myParams.set('category', categorySearch.join('↕'));

              if (!newNewProd.includes('category')) {
                newNewProd.push('category');
              }

              if (newProdCategory.length === 100) {
                newProdCategory = newProdCategory.filter((prod) => {
                  if (prod.category === el.id) {
                    return prod;
                  }
                });
              } else {
                products.forEach((prod) => {
                  if (prod.category === el.id && !newProdCategory.includes(prod)) {
                    newProdCategory.push(prod);
                  }
                });
              }
            }

            if (el.closest('.filter__by-brand')) {
              brandSearch.push(el.id);

              myParams.set('brand', brandSearch.join('↕'));

              if (!newNewProd.includes('brand')) {
                newNewProd.push('brand');
              }

              if (newProdBrand.length === 100) {
                newProdBrand = newProdBrand.filter((prod) => {
                  if (prod.brand === el.id) {
                    return prod;
                  }
                });
              } else {
                products.forEach((prod) => {
                  if (prod.brand === el.id && !newProdBrand.includes(prod)) {
                    newProdBrand.push(prod);
                  }
                });
              }
            }
          }
        });
        newProdCategory.forEach((prodC) => {
          newProdBrand.forEach((prodB) => {
            if (prodC === prodB) {
              finishArr.push(prodC);
            }
          });
        });
        if (!finishArr.length) {
          // console.log('peoductsArr!!!');
          window.localStorage.setItem('productsArr', JSON.stringify(products));
        }
        const searchArr = finishArr.filter((item) => {
          if (
            item.brand.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            item.category.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            item.discountPercentage.toString().toLowerCase().includes(searchInput.value.toLowerCase()) ||
            item.price.toString().includes(searchInput.value) ||
            item.rating.toString().includes(searchInput.value) ||
            item.title.toLowerCase().includes(searchInput.value.toLowerCase())
          ) {
            return item;
          }
        });

        createProducts(searchArr, document.querySelector('.products__field') as HTMLTemplateElement, foundValue);

        const rangePriceArr = searchArr.filter((item) => {
          if (
            Number(leftBorder[0].innerHTML.split(' ')[1]) <= Number(item.price) &&
            Number(rightBorder[0].innerHTML.split(' ')[1]) >= Number(item.price) &&
            Number(leftBorder[1].innerHTML) <= Number(item.stock) &&
            Number(rightBorder[1].innerHTML) >= Number(item.stock)
          ) {
            return item;
          }
        });

        if ((option[0] as HTMLSelectElement).value === (selectBar as HTMLSelectElement).value) {
          rangePriceArr.sort((a, b) => {
            return a.price - b.price;
          });
        } else if ((option[1] as HTMLSelectElement).value === (selectBar as HTMLSelectElement).value) {
          rangePriceArr.sort((a, b) => {
            return b.price - a.price;
          });
        } else if ((option[2] as HTMLSelectElement).value === (selectBar as HTMLSelectElement).value) {
          rangePriceArr.sort((a, b) => {
            return a.rating - b.rating;
          });
        } else if ((option[3] as HTMLSelectElement).value === (selectBar as HTMLSelectElement).value) {
          rangePriceArr.sort((a, b) => {
            return b.rating - a.rating;
          });
        }

        window.localStorage.setItem('productsArr', JSON.stringify(rangePriceArr));
        createProducts(rangePriceArr, document.querySelector('.products__field') as HTMLTemplateElement, foundValue);

        const fullUrl = '#main?' + myParams.toString();
        history.pushState(window.location.href, '#', fullUrl);

        if (checkedYesOrNot === false) {
          createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement, foundValue);
        }
      };

      filterSection?.addEventListener('click', () => {
        filterFunc();
      });
      searchInput.addEventListener('input', function () {
        filterFunc();
      });

      selectBar?.addEventListener('change', () => {
        filterFunc();
      });
      // const toCheck = (e: number | string, e1: number | string): string => {
      //   return e.toString().toLowerCase().includes(e1.toLowerCase());
      // };
    });
}
