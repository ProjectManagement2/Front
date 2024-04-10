<template>
    <div id="signup" class=" border rounded p-3 mx-auto">
      <b-form @submit="register" class="fg">
        <div class="form-group part">
            <div class="form-group required">
                <label class="control-label" for="surname">Фамилия:</label>
                <b-input v-model="form.surname" type="text" id="surname" placeholder="Фамилия"/>
            </div>

            <div class="form-group required">
                <label class="control-label" for="name">Имя:</label>
                <b-input v-model="form.name" type="text" id="name" placeholder="Имя"/>
            </div>

            <div class="form-group required">
                <label class="control-label" for="otch">Отчество:</label>
                <b-input v-model="form.otch" type="text" id="otch" placeholder="Отчество"/>
            </div>

            <div class="form-group required">
                <label class="control-label" for="data">Дата рождения:</label>
                <b-input v-model="form.email" type="text" id="data" v-imask="dataMask" placeholder="12.12.2000" @keypress="isNumber" @accept="onAccept" @complete="onComplete" maxlength="10"/>
                <p><small class="text-muted">Введите дату в формате: 00.00.0000</small></p>
            </div>

        </div>
        <div class="form-group part">
            <div class="form-group required">
                <label class="control-label" for="email">Почта:</label>
                <b-input v-model="form.data" type="text" id="email" placeholder="email@email.com"/>
                <p><small class="text-muted">Введите почту в формате: email@email.com</small></p>
            </div>

            <div class="form-group required">
                <label class="control-label" for="password">Пароль:</label>
                <b-input v-model="form.password" type="password" id="password" placeholder="Пароль..."></b-input>
                <p><small class="text-muted">Минимальная длина пароля 6 символов</small></p>
            </div>

            <!--<div class="form-group required">
                <label class="control-label" for="repeatPassword">Повторите пароль:</label>
                <b-input v-model="form.repeatPassword" type="password" id="repeatPassword" placeholder="Повторите пароль..."/>
            </div>-->

            
            <b-button variant="primary" type="submit">Регистрация</b-button>
            <!--<p class="text-danger" v-if="!$v.form.password.minLength">Длина пароля меньше 6 символов</p>
            <p  class="text-danger" v-if="isPasswordTheSame">Введённые пароли не совпадают</p> -->
            <p class="mt-2">
                <small class="text-muted">
                    Все поля отмеченные <span class="text-danger">*</span> обязательны для заполнения.
                </small>
            </p>

            <p class="mt-3">Уже есть аккаунт? <router-link class="link" to="/signin">Вход</router-link></p>
        </div>    

            
        </b-form>
    </div>
</template>

<script>
   //import { required, minLength, sameAs } from 'vuelidate/lib/validators';
   import {IMaskDirective} from 'vue-imask';
   import axios from 'axios';
   import router from '@/router/index.js';
   import VueRouter from 'vue-router';

   export default {
    name: "SignUp",
    data() {
      return {
        form: {
            surname: "",
            name: "",
            otch: "",
            data: "",
            email: "",
            password: "",
            //repeatPassword: "", 
        },
        
        userData: "",

        dataMask: {
            mask: '00.00.0000',
            lazy: true
        }
        
      };
    },
    methods: {
        register() {    
            let data = {
                surname:this.surname, 
                name: this.name,
                otch: this.otch,
                data: this.data,    
                email: this.email,
                password: this.password    
            };    
            axios.post("/api/auth/register", data)    //POST-запрос на эндпоинт /api/register с данными
                .then((response) => {
                    localStorage.access_token = response.data.token    
                    console.log("Registered successfully")    
                    router.push("/user/profile")
                           
                })    
                .catch((errors) => {    
                    console.log(errors)    
                });       
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
    #signup{
        width: 900px;
        font-size: 15px;
        box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) ;
    }
    .fg{
        display: flex;
        flex-direction: row;
    }
    .form-group.part{
        width: 50%;
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
    .link{
        text-decoration: none;
        color:rgb(157, 34, 96);
    } 
</style>
   