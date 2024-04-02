<template>
  <div id="app">
    <header>
    
      <router-link class="label" to="/signin">вход</router-link>
      <router-link class="label" to="/signup">регистрация</router-link>
      <router-link class="label1" to="/adm/auth">Admin</router-link>
      <router-link class="label1" to="/adm/profile">Admin Profile</router-link>
    </header>
    <div class="container-fluid my-5">
      <router-view></router-view>
    </div>
  </div>
 </template>

 <script>
 export default {
  name: 'App',
 };
 </script>

 <style>
  header{
    display: flex;
    padding: 5px;
    margin: 0px;
    justify-content: right;
    background-color: white;
    
  }
  .label{
    margin: 10px;
    padding: 5px;
    width: 155px;
    color:black;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
    font-weight: 500;
    border: 1px solid black;
    border-radius: 12px;
  }
  .label1{
    margin: 10px;
    padding: 5px;
    
    color:black;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
    font-weight: 500;
    
  }
 </style>