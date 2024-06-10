<template>
  <div class="list-col">
    <li class="orgs-list" @click="goToOrganizationPage">{{ organization.name }}</li>
    
  </div>
</template>
  
<script>
  import router from '@/router/index.js';
  import "bootstrap/dist/css/bootstrap.min.css";
  
  export default {
    props: ['organization'],
    methods: {
      goToOrganizationPage() {
        localStorage.org_id = this.organization._id;
        console.log(localStorage.org_id);
        // Переход на страницу организации с использованием маршрутизации
        router.push(`/organization/${this.organization.organizationId}`);
      }
    }
  };
</script>

<style>
  .list-col{
    display: flex;
    justify-content: center;
    margin-left: 0;
    
  }
  .orgs-list{
    padding-left: 0;
    list-style-type: none;
    margin: 10px;
    padding: 5px;
    width: 280px;
    color:black;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
    font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
    font-weight: 500;
    border: 1px solid rgb(155, 155, 155);
    border-radius: 10px;
  }
  li .orgs-list :hover{
    background-color: rgba(205, 226, 234, 0.421);
    
  }
</style>