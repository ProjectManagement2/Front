<template>
  <div id="app">
    <title>Project System</title>
    <Header/>
    <div v-if="isHomePage" >
      <MainPage/>
    </div>
    <div class="container-fluid " v-else>
      <router-view></router-view>
    </div>
  </div>
 </template>

 <script>
import Header from './components/additional_comp/Header.vue';
import MainPage from './components/MainPage.vue';
 export default {
  name: 'App',
  components: {
    Header,
    MainPage
  },
  computed: {
      isHomePage() {
        return this.$route.path === '/';
      }
  }
 };
 </script>

 <style>
  header{
    display: flex;
    padding: 5px;
    margin: 0px;
    justify-content: right;
    background-color: white;
    box-shadow: 0px 5px 7px 0px rgba(0, 0, 0, 0.1);
  }
  .label{
    margin: 10px;
    padding: 5px;
    width: 155px;
    color:black;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
    font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
    font-weight: 500;
    border: 1px solid black;
    border-radius: 12px;
  }
  
  button {
  background-color: transparent;
  border: none;
  }

  button img {
    width: 30px; /* Размер иконки меню */
    height: auto;
  }
 </style>