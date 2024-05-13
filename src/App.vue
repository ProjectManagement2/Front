<template>
  <div id="app">
    <MenuSide :is-visible="isMenuOpen" @close="toggleMenu" />
    <title>Project System</title>
    <header>
      <button @click="toggleMenu">
        <img src="@/assets/menu-icon.png" alt="Меню">
      </button>
      <router-link class="label" to="/signin">вход</router-link>
      <router-link class="label" to="/signup">регистрация</router-link>
    </header>
    <div class="container-fluid ">
      
      <router-view></router-view>
    </div>
  </div>
 </template>

 <script>
 import MenuSide from './components/additional_comp/Menu.vue';
 export default {
  name: 'App',
  components: {
    MenuSide
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
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