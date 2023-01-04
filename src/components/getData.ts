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
      let newProd = products;
      let newProdTho = products;
      let newNewProd: string[] = [];
      let categorySearch: string[] = [];
      let brandSearch: string[] = [];
      createList(categories, categorQuantity, document.querySelector('.categories') as HTMLTemplateElement);
      createList(brands, brandQuantity, document.querySelector('.brands') as HTMLTemplateElement);
      createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement);

      const inputs = document.querySelectorAll('input');

      const filterSection = document.querySelector('.filter__section');

      filterSection?.addEventListener('click', () => {
        // window.location.assign('#');
        createProducts(newProdTho, document.querySelector('.products__field') as HTMLTemplateElement);
        let checkedYesOrNot = false;
        const url = new URL(window.location.href);
        // console.log(url.origin);
        const myParams = new URLSearchParams(window.location.search);
        newProd = [];
        newNewProd = [];
        newProdTho = [];
        categorySearch = [];
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
              products.forEach((prod) => {
                if (prod.category === el.id) {
                  if (newNewProd.length === 1) {
                    newProd.push(prod);
                    createProducts(newProd, document.querySelector('.products__field') as HTMLTemplateElement);
                  } else {
                    newProd.forEach((prod) => {
                      if (prod.category === el.id) {
                        if (!newProdTho.includes(prod)) {
                          newProdTho.push(prod);
                        }
                      }
                      createProducts(newProdTho, document.querySelector('.products__field') as HTMLTemplateElement);
                    });
                  }
                }
              });
            }
            if (el.closest('.filter__by-brand')) {
              brandSearch.push(el.id);
              myParams.set('brand', brandSearch.join('↕'));
              if (!newNewProd.includes('brand')) {
                newNewProd.push('brand');
                // console.log(newNewProd);
              }
              products.forEach((prod) => {
                if (prod.brand === el.id) {
                  if (newNewProd.length === 1) {
                    newProd.push(prod);
                    createProducts(newProd, document.querySelector('.products__field') as HTMLTemplateElement);
                  } else {
                    newProd.forEach((prod) => {
                      if (prod.brand === el.id) {
                        if (!newProdTho.includes(prod)) {
                          newProdTho.push(prod);
                        }
                      }
                      createProducts(newProdTho, document.querySelector('.products__field') as HTMLTemplateElement);
                    });
                  }
                }
              });
            }
            // const fullUrl = url.origin + '?' + myParams.toString();
            const fullUrl = '#?' + myParams.toString();
            history.pushState(window.location.href, '?', fullUrl);
          }
        });
        if (checkedYesOrNot === false) {
          createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement);
        }
      });
    });
}
