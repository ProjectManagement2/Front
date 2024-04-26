<template>
    <div v-if="localIsVisible" id="add" >
      <b-form @submit.prevent="editProfile" class="card mb-4">
        <div class="card-header">
            <h4 class="card-heading">Редактировать</h4>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-auto d-flex align-items-center"><img class="avatar avatar-lg p-1" src="https://i.pinimg.com/originals/e3/41/40/e34140dc81a93041f8ae93e6b87b3c6c.jpg" alt="Avatar"></div>
                <div class="col">
                    <label class="form-label">Имя</label>
                    <input class="form-control mb-2" placeholder="Имя...">
                    <label class="form-label">Фамилия</label>
                    <input class="form-control mb-2" placeholder="Фамилия...">
                    <label class="form-label">Отчество</label>
                    <input class="form-control mb-2" placeholder="Отчество...">
                </div>
                </div>
                <div class="mb-3"> 
                    <label class="form-label">О себе</label>
                    <textarea class="form-control" rows="6">Опишите себя...</textarea>
                </div>
                <div class="mb-3"> 
                    <label class="form-label">Дата рождения</label>
                    <input class="form-control" placeholder="12.12.2000">
                </div>
                <div class="mb-3"> 
                    <label class="form-label">Почта</label>
                    <input class="form-control" placeholder="email@email.com">
                </div>
                <label class="form-label">Пароль</label>
                <input class="form-control" type="password" value="password">
            </div>
            <div class="card-footer text-end">
                <button variant="primary" class="btn btn-primary">Сохранить</button>
                <b-button variant="primary"class="btn-click" @click="closeForm">Закрыть</b-button>
            </div>
      </b-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
            organization: "",
            surname: "",
            name: "",
            otch: "",
        }
      };
    },
    methods: {
      editProfile() {
        // Ваша логика отправки формы
        console.log('Отправлено:', this.name);
      },
      closeForm() {
      this.$emit('close');
    }
      
    },
    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
        localIsVisible() {
            return this.isVisible;
        }
    }
  };
  </script>
  
<style>
  #add{

    font-size: 13px;
    
  }
  .name-form{
    font-size: 18px;
    margin: 5px;
    margin-bottom: 15px;
  }
  .btn{
    background-color: lightpink;
    font-size: 15px;
  } 
  .form-group, .row.form-group, .btn, .mt-3{
    margin-left:5px;
    margin-top: 5px;
    margin-right: 5px;
  }
  #organization, #surname, #name, #otch{
    margin-bottom: 5px;
    font-size: 13px ; 
  }
  .card-header:first-child {
    border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
  }
  .card-header {
    position: relative;
    padding: 2rem 2rem;
    border-bottom: none;
    background-color: white;
    box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
    z-index: 2;
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: none;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    border-radius: 1rem;
  }
  .bg-gray-100 {
    background-color: #f8f9fa !important;
  }
  body{
    font-family: 'Poppins';
  }
  img, svg {
    vertical-align: middle;
  }
  .avatar.avatar-lg {
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
  }
  .avatar {
    display: inline-block;
    position: relative;
    width: 3rem;
    height: 3rem;
    text-align: center;
    border: #dee2e6;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    line-height: 3rem;
  }
  .form-control{
    color: #343a40;
  }
  .page-heading {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 300;
  }
  .card-profile .card-header {
    height: 9rem;
    background-position: center center;
    background-size: cover;
  }
  .btn.btn-primary, .btn-click{
    margin-top: 14px;
    margin-bottom: 14px;
    margin-left: 4px;
  }
</style>