<template>
    <div id='adm-login' class="w-25 mx-auto border p-3 rounded">
      <b-form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <b-input v-model="form.email" type="text" id="email" placeholder="Адрес электронной почты..."></b-input>
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <b-input v-model="form.password" type="password" id="password" placeholder="Пароль..."></b-input>
        </div>
        <b-button class="btn-admin-login" variant="primary" type="submit">Войти</b-button>
      </b-form>
    </div>
</template>

<script>
    import router from '@/router/index.js';    
    import axios from "axios";    

    export default {    
        name: "LoginAdmin", 
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
                axios.post("/api/admin/auth", data)    //POST-запрос на эндпоинт /api/login с данными, содержащими электронную почту и пароль
                    .then((response) => { 
                        localStorage.access_token = response.data.token;   
                        console.log("Logged in");    
                        router.push("/adm/profile");   
                    })    
                    .catch((errors) => {    
                        console.log(errors);    
                    });    
                    
            }    
        }    
    };
</script>

<style>

  #adm-login{
      margin-top: 12%;
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  }
  .form-group{
      margin-left:15px;
      margin-top: 25px;
      margin-right: 15px;
  }
  .btn-admin-login{
    margin-top: 25px!important;
    margin-left: 15px!important;
    margin-bottom: 15px!important;
    color: rgb(67, 67, 67) !important;
    height: 40px;
    background-color: rgb(168, 205, 234) !important;
    border-color: rgb(168, 205, 234) !important;
    border-radius: 8px;
  }  
</style>