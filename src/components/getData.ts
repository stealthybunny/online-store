import { JSONresponse } from '../types';
import { createList, createProducts } from './createPageElements';
export default function getData() {
  fetch('https://dummyjson.com/products?limit=100')
    .then((response) => {
      return response.json();
    })
    .then((data: JSONresponse) => {
      const products = data.products;
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
      createList(categories, document.querySelector('.categories') as HTMLTemplateElement);
      createList(brands, document.querySelector('.brands') as HTMLTemplateElement);
      createProducts(products, document.querySelector('.products__field') as HTMLTemplateElement);
    });
}
