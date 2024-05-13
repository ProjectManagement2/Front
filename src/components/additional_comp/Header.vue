<template>
    <header>
      <template v-if="isHomePage">
        <router-link class="label" to="/signin">вход</router-link>
        <router-link class="label" to="/signup">регистрация</router-link>
      </template>
      <template v-else-if="isLoginPage || isRegisterPage">
        <router-link to="/">На главную</router-link>
      </template>
      <template v-else>
        <router-link to="/">На главную</router-link>
        <!-- Другие общие кнопки -->
      </template>
    </header>
</template>
  
<script>
  export default {
    computed: {
      // Проверка текущего пути, чтобы определить, находится ли пользователь на главной странице
      isHomePage() {
        return this.$route.path === '/';
      },
      // Проверка текущего пути, чтобы определить, находится ли пользователь на странице входа
      isLoginPage() {
        return this.$route.path === '/signin';
      },
      // Проверка текущего пути, чтобы определить, находится ли пользователь на странице регистрации
      isRegisterPage() {
        return this.$route.path === '/signup';
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
</style>
  