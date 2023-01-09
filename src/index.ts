import App from './core/pages/app/index';
import { parseUrl } from './core/pages/main/urlInteractions';
import getData from './components/getData';

const app = new App();
app.run();

import './template.css';
import './main.css';

window.addEventListener('load', () => {
  // window.location.assign('#');
  setTimeout(() => {
    parseUrl(window.location.hash);
    const searchInput = document.querySelector('.search') as HTMLInputElement;
    const foundValue = document.querySelector('.found__value') as HTMLSpanElement;
    getData(searchInput, foundValue);
  }, 1000);
});
