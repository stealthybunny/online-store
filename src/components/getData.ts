import { JSONresponse, productDatum } from '../types';
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

      createList(categories, categorQuantity, document.querySelector('.categories') as HTMLTemplateElement);
      createList(brands, brandQuantity, document.querySelector('.brands') as HTMLTemplateElement);
      createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement);

      let newProd: productDatum[] = [];

      const inputs = document.querySelectorAll('input');

      const filterCategory = document.querySelector('.filter__by-catgory');
      filterCategory?.addEventListener('click', () => {
        let checkedYesOrNot = false;
        newProd = [];
        inputs.forEach((el) => {
          if (el.checked) {
            checkedYesOrNot = true;
            products.forEach((prod) => {
              if (prod.category === el.id) {
                newProd.push(prod);
              }
              createProducts(newProd, document.querySelector('.products__field') as HTMLTemplateElement);
            });
            return;
          }
        });
        if (checkedYesOrNot === false) {
          createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement);
        }
      });

      const filterBrand = document.querySelector('.filter__by-brand');
      filterBrand?.addEventListener('click', () => {
        let checkedYesOrNot = false;
        newProd = [];
        inputs.forEach((el) => {
          if (el.checked) {
            checkedYesOrNot = true;
            products.forEach((prod) => {
              if (prod.brand === el.id) {
                newProd.push(prod);
              }
              createProducts(newProd, document.querySelector('.products__field') as HTMLTemplateElement);
            });
            return;
          }
        });
        if (checkedYesOrNot === false) {
          createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement);
        }
      });
    });
}
