<template>
    <div id='signin' class="w-25 mx-auto border p-3 rounded">
      <b-form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <b-input v-model="form.email" type="text" id="email" placeholder="Адрес электронной почты..."></b-input>
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <b-input v-model="form.password" type="password" id="password" placeholder="Пароль"></b-input>
        </div>
        <b-button variant="primary" type="submit">Вход</b-button>
        
        <p class="mt-3">Ещё не зарегистрированы? <router-link class="link" to="/signup">Регистрация</router-link>
        </p>
      </b-form>
    </div>
</template>
   
<script>
import axios from 'axios';
import router from '@/router/index.js';

  export default {
    name: "SignIn",
    data() {
      return {
        form: {
          email: "",
          password: "",
        }
        
      };
    },
    methods: {
      login() { 
          let data = {
              email: this.form.email,
              password: this.form.password
          };
          axios.post("/api/auth/login", data) // POST-запрос на эндпоинт /api/login с данными
              .then((response) => {
                  localStorage.access_token = response.data.token; 
                  console.log("Logged in");
                  router.push("/user/profile");
              })
              .catch((errors) => {
                  console.log(errors);
              });
      }
    }
  };
   
</script>

<style>

  #signin{
    margin-top: 10%;
    font-size: 15px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  }
  .btn{
    background-color: lightpink;
    font-size: 15px;
  } 
  .form-group, .btn, .mt-3{
      margin-left:15px;
      margin-top: 25px;
      margin-right: 15px;
  }
  label{
    margin-bottom: 10px;
  }
  .link{
    text-decoration: none;
    color:rgb(167, 80, 124);
  } 
  
</style>