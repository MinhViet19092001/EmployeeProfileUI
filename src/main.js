import { createApp } from 'vue'
import App from './App.vue'
import Router from './routers/router'
import store from './store.js';

var app = createApp(App);
app.use(Router)
app.use(store)
app.mount('#app')
