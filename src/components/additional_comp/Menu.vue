<template>
    <div v-if="localIsVisible">
      <!-- Боковое меню -->
      <div class="side-menu">
        <button @click="closeMenu">
          <img src="@/assets/close-icon.png" alt="Закрыть">
        </button>
        <router-link class="label1" to="/adm/auth">Вход (Admin)</router-link>
        <router-link class="label1" to="/adm/profile">Профиль (Admin)</router-link>
        <router-link class="label1" to="/user/profile">Профиль</router-link>
      </div>
  
      <!-- Затемнение остальной части страницы -->
      <div class="overlay" @click="closeMenu"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false
      };
    },
    methods: {
      closeMenu() {
        this.$emit('close');
      }
    },
    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
        localIsVisible() {
            return this.isVisible;
        }
    }
  };
  </script>
  
  <style scoped>
  .side-menu {
    position: fixed;
    top: 0;
    left: 15%;
    width: 15%; /* Ширина бокового меню */
    height: 100%;
    background-color: white; /* Цвет фона бокового меню */
    z-index: 1000; /* Позиция по z-index - поверх всего остального контента */
    transition: transform 0.3s ease; /* Анимация для открытия/закрытия меню */
    transform: translateX(-100%);
  }
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Прозрачный чёрный цвет */
    z-index: 999; /* Позиция по z-index - под боковым меню, но поверх остального контента */
  }
  .label1{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 10px;
    padding: 5px;
    
    color:black;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
    font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
    font-weight: 500;
    
  }
  button {
  background-color: transparent;
  border: none;
  }

  button img {
    width: 20px; /* Размер иконки меню */
    height: auto;
  }
  </style>
  