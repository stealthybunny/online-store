import { JSONresponse } from '../types';
import { createList, createProducts } from './createPageElements';
export default function getData() {
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

      products.forEach((product) => {
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
      createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement);

      const inputs = document.querySelectorAll('input');
      const filterSection = document.querySelector('.filter__section');

      filterSection?.addEventListener('click', () => {
        let checkedYesOrNot = false;
        // const url = new URL(window.location.href);
        const myParams = new URLSearchParams(window.location.search);
        newProdCategory = [...products];
        newProdBrand = [...products];

        categorySearch = [];
        finishArr = [];
        brandSearch = [];
        inputs.forEach((el) => {
          if (el.checked) {
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
        createProducts(finishArr, document.querySelector('.products__field') as HTMLTemplateElement);
        const fullUrl = '#?' + myParams.toString();
        history.pushState(window.location.href, '#', fullUrl);
        if (checkedYesOrNot === false) {
          createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement);
        }
        newNewProd = [];
      });
    });
}
