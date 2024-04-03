<template>
    <div id='signin' class="w-25 mx-auto border p-3 rounded">
      <b-form @submit="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <b-input v-model="email" type="text" id="email" placeholder="ваш никнейм"></b-input>
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
        email: "",
        password: ""
      };
    },
    methods: {
      login: (e) => {    
                e.preventDefault()      
                let login = () => {    
                    let data = {    
                        email: this.email,    
                        password: this.password    
                    }    
                    axios.post("/api/auth/login", data)    //POST-запрос на эндпоинт /api/login с данными
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
    margin-top: 10%;
    font-size: 15px;

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
  button{
    background-color: lightpink;
    font-size: 15px;
  } 
</style>