import { JSONresponse } from '../types';
import { createList, createProducts } from './createPageElements';
export default function getData() {
  fetch('https://dummyjson.com/products?limit=100')
    .then((response) => {
      return response.json();
    })
    .then((data: JSONresponse) => {
      const products = data.products;

      // const newProd: productDatum[] = [];
      // products.forEach((prod) => {
      //   if (prod.category === 'smartphones') {
      //     newProd.push(prod);
      //   }
      // });

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

      // ----------------------------- Функция создает строку "КАТЕГОРИЯ (КОЛИЧЕСТВО\КОЛИЧЕСТВО)" ------------------------
      const countCategory = (categ: string) => {
        let k = 0;
        for (let i = 0; i < products.length; i++) {
          if (products[i].category === categ) {
            k = k + 1;
          }
        }
        return `${categ} (${k}/${k})`;
      };

      // ----------------------------- Функция создает строку "БРЕНД (КОЛИЧЕСТВО\КОЛИЧЕСТВО)" ------------------------
      const countBrand = (brand: string) => {
        let k = 0;
        for (let i = 0; i < products.length; i++) {
          if (products[i].brand === brand) {
            k = k + 1;
          }
        }
        return `${brand} (${k}/${k})`;
      };

      categories.forEach((categ) => {
        categorQuantity.push(countCategory(categ));
      });
      brands.forEach((bran) => {
        brandQuantity.push(countBrand(bran));
      });

      createList(categorQuantity, document.querySelector('.categories') as HTMLTemplateElement);
      createList(brandQuantity, document.querySelector('.brands') as HTMLTemplateElement);
      createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement);
    });
}
