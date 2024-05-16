<template>
  <div v-if="localIsVisible">
    <div  id="add" class="w-75 mx-auto border p-3 rounded">
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
            <div class="form-group">
              <label for="checkbox">Важная задача:</label>
              <input type="checkbox" id="isImportant" v-model="form.isImportant"></input>
            </div>
          </div>
          <div class="col">
            
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
            <div class="form-group">
              <label for="file">Прикрепить файл:</label>
              <input type="file" id="file" ref="fileInput" accept=".jpg, .jpeg, .png, .pdf" multiple>
            </div>
          </div>
        </div>
        <b-button variant="primary" class="btn-add-addtask" type="submit">Добавить</b-button>
        <b-button variant="primary" class="btn-close-addtask" @click="closeForm">Закрыть</b-button>
      </b-form>
    </div>
    <div class="overlay" @click="closeForm"></div>
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
      // Создаем объект FormData для передачи данных формы, включая файлы
      let formData = new FormData();
      
      // Добавляем остальные данные задачи к formData
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);
      formData.append('deadline', this.form.deadline);
      formData.append('isImportant', this.form.isImportant);
      formData.append('tags', this.form.tags);
      formData.append('worker', this.form.worker);

      // Добавляем выбранные файлы к formData
      if (this.$refs.fileInput.files.length > 0) {
        for (let i = 0; i < this.$refs.fileInput.files.length; i++) {
          let file = this.$refs.fileInput.files[i];
          formData.append('files', file);
        }
      }

      // Отправляем данные на сервер
      if (this.form.worker){
        axios
          .post("/api/project/createTask", formData , {
            headers: {
              'Content-Type': 'multipart/form-data', // Устанавливаем Content-Type как multipart/form-data для передачи файлов
              'authorization': `Bearer ${localStorage.access_token}`,
              'projectid': localStorage.proj_id,
              'stageid': this.stageId
            }
          })    
          .then(() => {    
            console.log("New task is created");
            window.location.reload();    
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
    },
    stageId: {
      type: String,
      required: true
    }
  },
  computed: {
      localIsVisible() {
          return this.isVisible;
      }
  }
};
</script>

<style scoped>
#add{
  left: 50%;
  top: -300px;
  background-color: white;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 13px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 1000; /* Позиция по z-index - поверх всего остального контента */
  transition: transform 0.3s ease; /* Анимация для открытия/закрытия меню */
  transform: translateX(-100%);
}
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Прозрачный чёрный цвет */
    z-index: 999; /* Позиция по z-index - под боковым меню, но поверх остального контента */
}
.name-form{
  font-size: 18px;
  margin: 5px;
  margin-bottom: 15px;
}
.btn-add-addtask, .btn-close-addtask{
  background-color: lightpink;
  font-size: 15px;
  color: rgb(67, 67, 67)!important;
  background-color: rgb(168, 205, 234) !important;
  border-color: rgb(168, 205, 234) !important;
} 
.form-group, .row.form-group, .mt-3{
  margin-left:5px;
  margin-top: 5px;
  margin-right: 5px;
}
#name, #description, #deadline, #checkbox, #tags, #file{
  margin-bottom: 5px;
  font-size: 13px ; 
}
</style>