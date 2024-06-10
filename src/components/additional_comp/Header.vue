<template>
  <div>
    <MenuSide :is-visible="isMenuOpen" @close="toggleMenu" />
    <header>
      <template v-if="isHomePage">
        <img class="img-title" src="@/assets/title.jpg">
        <router-link class="label-header" to="/signin">вход</router-link>
        <router-link class="label-header" to="/signup">регистрация</router-link>
      </template>
      <template v-else-if="isLoginPage || isRegisterPage">
        <img class="img-title-log" src="@/assets/title.jpg">
        <router-link class="label-header" to="/">На главную</router-link>
      </template>
      <template v-else>
        <img class="img-title-main" src="@/assets/title.jpg">
        <router-link class="label-header" to="/">На главную</router-link>
        <button @click="toggleMenu">
          <img src="@/assets/menu-icon.png" alt="Меню" />
        </button>
      </template>
    </header>
  </div>
</template>

<script>
import MenuSide from "./Menu.vue";
export default {
  components: {
    MenuSide,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  computed: {
    // Проверка текущего пути, чтобы определить, находится ли пользователь на главной странице
    isHomePage() {
      return this.$route.path === "/";
    },
    // Проверка текущего пути, чтобы определить, находится ли пользователь на странице входа
    isLoginPage() {
      return this.$route.path === "/signin";
    },
    // Проверка текущего пути, чтобы определить, находится ли пользователь на странице регистрации
    isRegisterPage() {
      return this.$route.path === "/signup";
    },
  },
};
</script>

<style>
header {
  display: flex;
  padding: 5px;
  margin: 0px;
  width: 100%;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0px 5px 7px 0px rgba(0, 0, 0, 0.1);
}

.label-header {
  margin: 10px;
  padding: 5px;
  width: 10%;
  color: black;
  text-align: center;
  text-decoration: none;
  font-size: 90%;
  font-family: "Avantgarde", "TeX Gyre Adventor", "URW Gothic L", sans-serif;
  font-weight: 500;
  border: 1px solid black;
  border-radius: 12px;
}
.img-title{
  height: 35px;
  margin-top: 10px;
  right: 65%;
}
.img-title-log{
  height: 35px;
  margin-top: 10px;
  right: 76.5%;
}
.img-title-main{
  height: 35px;
  margin-top: 10px;
  right: 73.5%;
}
</style>
