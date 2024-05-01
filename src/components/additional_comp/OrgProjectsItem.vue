<template>
    <div class="list-col">
      <li @click="goToProjectPage">{{ project.name }}</li>
      
    </div>
  </template>
    
  <script>
    import router from '@/router/index.js';
    import "bootstrap/dist/css/bootstrap.min.css";
    
    export default {
      props: ['project'],
      methods: {
        goToProjectPage() {
          localStorage.proj_id = this.project._id;
          console.log(localStorage.proj_id);
          router.push(`/project/page`);
        }
      }
    };
  </script>
  
  <style>
    .list-col{
      display: flex;
      margin-left: 0;
    }
    li{
      padding-left: 0;
      list-style-type: none;
      margin: 10px;
      padding: 5px;
      width: 380px;
      color:black;
      text-align: center;
      text-decoration: none;
      font-size: 17px;
      font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
      font-weight: 500;
      border: 1px solid rgb(155, 155, 155);
      border-radius: 10px;
    }
    li:hover{
      background-color: rgba(234, 205, 221, 0.421);
      
    }
  </style>