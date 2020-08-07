import 'regenerator-runtime/runtime';
import App from './app.js';

const $app = document.querySelector('#app');
const app = new App($app);
app.start();
