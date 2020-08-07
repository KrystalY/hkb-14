import 'regenerator-runtime/runtime';
import App from '@src/app.js';

const $app = document.querySelector('#app');
const app = new App($app);
app.start();
