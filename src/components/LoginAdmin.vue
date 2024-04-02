<template>
    <div id='adm-login' class="w-25 mx-auto border p-3 rounded">
      <b-form @submit="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <b-input v-model="username" type="text" id="email" placeholder="Адрес электронной почты..."></b-input>
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <b-input v-model="password" type="password" id="password" placeholder="Пароль..."></b-input>
        </div>
        <b-button class="btn" variant="primary" type="submit">Войти</b-button>
      </b-form>
    </div>
</template>

<script>
    import router from "../router"    
    import axios from "axios"    

    export default {    
        name: "LoginAdmin", 
        data() {
            return {
                email: '',
                password: ''
            }
        },   
        methods: {    
            login: (e) => {    
                e.preventDefault()      
                let login = () => {    
                    let data = {    
                        email: this.email,    
                        password: this.password    
                    }    
                    axios.post("/admin/auth", data)    //POST-запрос на эндпоинт /api/login с данными, содержащими электронную почту и пароль
                        .then((response) => { 
                            localStorage.access_token = response.data.access_token   
                            console.log("Logged in")    
                            router.push("/adm/profile")    
                        })    
                        .catch((errors) => {    
                            console.log("Cannot log in")    
                        })    
                }    
                login()    
            }    
        }    
    }
</script>

<style>

  #adm-login{
      margin-top: 12%;

  }
  .form-group, .btn{
      margin-left:15px;
      margin-top: 25px;
      margin-right: 15px;
  }
    
</style>