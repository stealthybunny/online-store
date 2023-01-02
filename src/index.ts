import App from './core/pages/app/index';

const app = new App();
app.run();

import './template.css';
import './main.css';

window.addEventListener('load', () => {
  window.location.assign('#');
});
