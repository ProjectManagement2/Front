<template>
    <div id="signup" class="w-50 border rounded p-3 mx-auto">
      <b-form @submit="register">
            <div class="form-group required">
                <label class="control-label" for="username">Имя:</label>
                <b-input v-model="form.username" type="text" id="username" placeholder="Имя"/>
            </div>

            <div class="form-group required">
                <label class="control-label" for="surname">Фамилия:</label>
                <b-input v-model="form.surname" type="text" id="surname" placeholder="Фамилия"/>
            </div>

            <div class="form-group required">
                <label class="control-label" for="email">Почта:</label>
                <b-input v-model="form.data" type="text" id="email" placeholder="email@email.com"/>
                <p><small class="text-muted">Введите почту в формате: email@email.com</small></p>
            </div>

            <div class="form-group required">
                <label class="control-label" for="data">Дата рождения:</label>
                <b-input v-model="form.email" type="text" id="data" v-imask="dataMask" placeholder="12.12.2000" @keypress="isNumber" @accept="onAccept" @complete="onComplete" maxlength="10"/>
                <p><small class="text-muted">Введите дату в формате: 12.12.2000</small></p>
            </div>

            <div class="form-group required">
                <label class="control-label" for="password">Пароль:</label>
                <b-input v-model="form.password" type="password" id="password" placeholder="Пароль..."></b-input>
                <p><small class="text-muted">Минимальная длина пароля 6 символов</small></p>
            </div>

            <div class="form-group required">
                <label class="control-label" for="repeatPassword">Повторите пароль:</label>
                <b-input v-model="form.repeatPassword" type="password" id="repeatPassword" placeholder="Повторите пароль..."/>
            </div>

            
            <b-button variant="primary" type="submit" :disabled="formValid">Регистрация</b-button>
            <!--<p class="text-danger" v-if="!$v.form.password.minLength">Длина пароля меньше 6 символов</p>
            <p  class="text-danger" v-if="isPasswordTheSame">Введённые пароли не совпадают</p> -->
            <p class="mt-2">
                <small class="text-muted">
                    Все поля отмеченные <span class="text-danger">*</span> обязательны для заполнения.
                </small>
            </p>

            <p class="mt-3">Уже есть аккаунт? <router-link to="/signin">Вход</router-link></p>
        </b-form>
    </div>
</template>

<script>
   //import { required, minLength, sameAs } from 'vuelidate/lib/validators';
   import {IMaskDirective} from 'vue-imask';

   export default {
    name: "SignUp",
    data() {
      return {
        form: {
            username: "",
            surname: "",
            email: "",
            data: "",
            password: "",
            repeatPassword: "", 
        },
        
        userData: "",

        dataMask: {
            mask: '00.00.0000',
            lazy: true
        }
        
      };
    },
    methods: {
        register: (e) => {    
            e.preventDefault()      
            let register = () => {    
                let data = {
                    username: this.username,
                    surname:this.surname,    
                    email: this.email,
                    data: this.data,    
                    password: this.password    
                }    
                axios.post("/auth/register", data)    //POST-запрос на эндпоинт /api/register с данными
                    .then((response) => {
                        localStorage.access_token = response.data.access_token    
                        console.log("Registered successfully")    
                        //router.push("/admin/profile")    
                    })    
                    .catch((errors) => {    
                        console.log("Registration failed")    
                    })    
            }    
            register()    
        },    
        onAccept(e) {
            const maskRef = e.detail
            this.data = maskRef.value
        },
        onComplete(e) {
            const maskRef = e.detail
            this.userData = maskRef.unmaskedValue
        },
        isNumber(e) {
            let regex = /[0-9]/

            if (!regex.test(e.key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
            }
        }
    },
    
    // validations: {
    //     username: {
    //         required
    //     },
    //     password: {
    //         required,
    //         minLength: minLength(7)
    //     },
    //     repeatPassword: {
    //         required,
    //         sameAs: sameAs('password')
    //     },
    //     data: {
    //         required
    //     }
    // },
    // computed: {
    //     formValid() {
    //         return this.$v.$invalid
    //     }
    // },
    directives: {
        imask: IMaskDirective
    }
   };
   
</script>

<style>
    #signin{
        margin-top: 12%;
        font-size: 20px;
    }
    .form-group.required .control-label:after {
        content:" *";
        color:red;
    }
    
    .form-group, .btn, .mt-3{
        margin-left:15px;
        margin-top: 25px;
        margin-right: 15px;
    }
    .mt-2{
        margin-left:15px;
    }
    label{
        margin-bottom: 10px;
    }
</style>
   