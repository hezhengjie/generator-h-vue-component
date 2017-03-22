require('es6-promise').polyfill();
import Vue from 'vue'

import App from '../src/components/<%= name %>.vue'
new Vue({
  el: '#app',
  mounted(){
  },
  components:{
    App
  }
})
