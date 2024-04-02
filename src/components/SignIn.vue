<template>
    <div id='signin' class="w-25 mx-auto border p-3 rounded">
      <b-form @submit="login">
        <div class="form-group">
          <label for="username">Логин:</label>
          <b-input v-model="username" type="text" id="username" placeholder="ваш никнейм"></b-input>
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <b-input v-model="password" type="password" id="password" placeholder="ваш пароль"></b-input>
        </div>
        <form action="#">
          <button class="btn">Войти</button>
        </form>
        
        <p class="mt-3">Ещё не зарегистрированы? <router-link class="link" to="/signup">Регистрация</router-link>
        </p>
      </b-form>
    </div>
</template>
   
<script>
  export default {
    name: "SignIn",
    data() {
      return {
        username: "",
        password: ""
      };
    },
    methods: {
      login: (e) => {    
                e.preventDefault()      
                let login = () => {    
                    let data = {    
                        username: this.username,    
                        password: this.password    
                    }    
                    axios.post("/auth/login", data)    //POST-запрос на эндпоинт /api/login с данными
                        .then((response) => { 
                            localStorage.access_token = response.data.access_token   
                            console.log("Logged in")    
                            router.push("/admin/profile")    
                        })    
                        .catch((errors) => {    
                            console.log("Cannot log in")    
                        })    
                }    
                login()    
            }    
    }
  };
   
</script>

<style>

  #signin{
      margin-top: 12%;
      font-size: 20px;

  }
  .btn{
    background-color: lightpink;
    font-size: 20px;
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
  button{
    background-color: lightpink;
    font-size: 20px;
  } 
</style>