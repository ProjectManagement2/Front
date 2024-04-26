<template>
  <div id="app">
    <title>Project System</title>
    <header>
      <router-link class="label" to="/signin">вход</router-link>
      <router-link class="label" to="/signup">регистрация</router-link>
      <router-link class="label1" to="/adm/auth">Admin log</router-link>
      <router-link class="label1" to="/adm/profile">Admin Prof</router-link>
      <router-link class="label1" to="/user/profile">User Prof</router-link>
      <router-link class="label1" to="/project/create">Proj</router-link>
      <router-link class="label1" to="/organization/page">Org</router-link>
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
  .label1{
    margin: 10px;
    padding: 5px;
    
    color:black;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
    font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
    font-weight: 500;
    
  }
  
 </style>