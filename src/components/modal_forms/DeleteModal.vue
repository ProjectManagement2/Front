<template>
    <div v-if="localIsVisible" id="add" class="w-75 mx-auto border p-3 rounded">
      <b-form @submit.prevent="deleteOrg">
        <h3 class="name-form">Удаление организаций</h3>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="name">Организация:</label>
              <b-input v-model="form.name" type="text" id="name" placeholder="Название организации"></b-input>
            </div>
            <div class="form-group">
              <label for="description">Описание:</label>
              <b-input v-model="form.description" type="text" id="description" placeholder="Расскажите об организации"></b-input>
            </div>
          </div>
          <div class="col">
            <div class="row form-group">
              <label>Выберете ответственного за организацию:</label>
              <select v-model="form.leaderId" @change="selectUser">
                <option v-for="user in users" :key="user._id" :value="user._id">
                  {{ user.surname }} {{ user.name }} {{ user.otch }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <b-button variant="primary" type="submit">Удалить</b-button>
        <b-button variant="primary" class="btn" @click="closeForm">Закрыть</b-button>
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
      deleteOrg() {
        // Ваша логика отправки формы
        console.log('Отправлено:', this.name);
      },
      closeForm() {
      // Метод для закрытия формы
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
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 13px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
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
  .form-group, .btn, .mt-3{
      margin-left:5px;
      margin-top: 5px;
      margin-right: 5px;
  }
  #organization, #surname, #name, #otch{
    margin-bottom: 5px;
    font-size: 13px ; 
  }
</style>