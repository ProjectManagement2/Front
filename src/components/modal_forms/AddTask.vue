<template>
    <div v-if="localIsVisible" id="add" class="w-75 mx-auto border p-3 rounded">
      <b-form @submit.prevent="addTask">
        <h3 class="name-form">Добавление задачи</h3>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="name">Название:</label>
              <b-input v-model="form.name" type="text" id="name" placeholder="Название задачи"></b-input>
            </div>
            <div class="form-group">
              <label for="description">Описание:</label>
              <b-input v-model="form.description" type="text" id="description" placeholder="Расскажите о задаче"></b-input>
            </div>
            <div class="form-group">
              <label for="deadline">Дедлайн:</label>
              <b-input v-model="form.deadline" type="date" id="deadline" placeholder="Дата завершения задачи: 01.01.2000"></b-input>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label for="checkbox">Важная задача:</label>
              <input type="checkbox" id="isImportant" v-model="form.isImportant"></input>
            </div>
            <div class="form-group">
              <label for="tags">Тэги (разделяйте запятыми):</label>
              <b-input type="text" id="tags" v-model="form.tags"></b-input>
            </div>
            <div class="row form-group">
              <label>Выберете ответственного за организацию:</label>
              <select v-model="form.worker" @change="selectUser">
                <option v-for="user in users" :key="user._id" :value="user._id">
                  {{ user.surname }} {{ user.name }} {{ user.otch }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <b-button variant="primary" type="submit">Добавить</b-button>
        <b-button variant="primary" class="btn" @click="closeForm">Закрыть</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        users: [],
        form: {
            name: "",
            description: "",
            deadline: "",
            isImportant: false,
            tags: '',
            worker: ''
        }
      };
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      getUsers(){
        axios
          .get('/api/organization/getMembers', {
            headers: {
              'authorization': `Bearer ${localStorage.access_token}`,
              'organizationId': localStorage.org_id
            }
          })
          .then((response) => {
            this.users = response.data
          });
      },

      selectUser() {
        console.log('Выбран пользователь с ID:', this.form.worker);
      },

      addTask() {
        let data = {    
          name: this.form.name,    
          description: this.form.description,
          deadline: this.form.deadline,
          isImportant: this.form.isImportant,
          tags: this.form.tags,
          worker: this.form.worker    
        };
        if (this.form.worker){
          axios
          .post("/api/project/createTask", data , {
            headers: {
              'authorization': `Bearer ${localStorage.access_token}`,
              'projectid': localStorage.proj_id,
              'stageid': localStorage.stage_id
            }
          })    
          .then(() => {    
            console.log("New task is created");    
               
          })    
          .catch((errors) => {    
            console.log(errors);    
          }); 
        } else {
          console.warn('Исполнитель не выбран');
        }
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
  .form-group, .row.form-group, .btn, .mt-3{
    margin-left:5px;
    margin-top: 5px;
    margin-right: 5px;
  }
  #organization, #description, #name, #otch{
    margin-bottom: 5px;
    font-size: 13px ; 
  }
</style>