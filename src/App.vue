<template>
  <div id="app" class="container-xxl">
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
  </head>
    <Header :pages="pages"/>

    <router-view>

    </router-view>

    <Footer/>
  </div>
    
</template>

<script>


import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// Регистрируем глобальную пользовательскую директиву `v-focus`


export default {
  name: 'App',
  components: {
    Header,
    Footer,
    
  },
  
  data(){
    return {
      pages: ['main', 'saved'],
    }
  },
  provide: {
    key: '731bfc9f3e61ca1204c8fb555276655f',
  },
  computed: {
    windowWidth(){
      return document.body.clientWidth
    }
  },
  watch: {
    windowWidth(){
      console.log(this.windowWidth)
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
