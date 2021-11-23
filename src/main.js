import { createApp, h } from 'vue'
import App from './App.vue'
import { router } from './router'
//import store from './store'
//import API from './api'

const app  = createApp({
    render: ()=>h(App)
});
//app.use(VueRouter);
//app.use(store);
app.use(router);
//app.use(API);


app.mixin({
  methods: {
    navigateTo: function(route){
      console.log(route);
      router.push({name: route});
    }
  }
})

console.log(app)
app.mount('#app')
