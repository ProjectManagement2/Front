<template>
    <div v-if="localIsVisible">
      <div id="edit" class="w-75 mx-auto border p-3 rounded">
        <b-form @submit.prevent="editProject">
          <h3 class="name-form">Редактирование проекта</h3>
          <div class="card-body">
            <div class="row mb-3">
              <div class="row form-group">
                <label>Выберете проект, который хотите изменить:</label>
                <select class="select-editproject" v-model="form.ProjectId" @change="selectProject">
                  <option v-for="project in projects" :key="project._id" :value="project._id">
                    {{ project.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="name">Новое название:</label>
                <b-input v-model="form.name" type="text" id="name" placeholder="Название проекта"></b-input>
              </div>

              <div class="form-group">
                <label for="description">Описание проекта:</label>
                <b-input v-model="form.description" type="text" id="description" placeholder="Описание проекта"></b-input>
              </div>
            </div>
          </div>
          <div class="card-footer text-end">
            <b-button variant="primary" class="btn-save-editproject">Сохранить</b-button>
            <b-button variant="primary" class="btn-close-editproject" @click="closeForm">Закрыть</b-button>
          </div>
        </b-form>
      </div>
      <div class="overlay" @click="closeForm"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        projects: [],
        form: {
          name: "",
          description: "",
          ProjectId: ''
        }
      };
    },
    mounted(){
      this.getProjects()
    },
    methods: {
      getProjects() {
        axios
          .get("/api/organization/getProjects", {
            headers: {
              authorization: `Bearer ${localStorage.access_token}`,
              organizationId: localStorage.org_id,
            },
          })
          .then((response) => {
            this.projects = response.data;
            console.log(this.projects);
          });
      },
      selectProject() {
        console.log('Выбран проект с ID:', this.form.ProjectId);
      },
      editProject() {
        axios
          .patch("/api/organization/updateProject", form, {
            headers: {
              'authorization': `Bearer ${localStorage.access_token}`,
            }
          })
          .then(() => {
            console.log("Данные пользователя обновлены");
            window.location.reload();
          })
          .catch((errors) => {
            console.log(errors);
          });
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
  
  <style scoped>
  #edit{
      left: 50%;
      top: -500px;
      margin-top: 15px;
      margin-bottom: 15px;
      font-size: 13px;
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
      z-index: 1000; /* Позиция по z-index - поверх всего остального контента */
      transition: transform 0.3s ease; /* Анимация для открытия/закрытия меню */
      transform: translateX(-100%);
      background-color: white;
      
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
  
  .name-form {
    font-size: 18px;
    margin: 5px;
    margin-bottom: 15px;
  }
  
  .btn-save-editproject,
  .btn-close-editproject {
    background-color: lightpink;
      font-size: 15px;
      color: rgb(67, 67, 67)!important;
      background-color: rgb(168, 205, 234) !important;
      border-color: rgb(168, 205, 234) !important;
      margin-right: 10px;
      margin-top: 20px;
      margin-left: 5px;
  }
  
  .form-group,
  .row.form-group,
  .mt-3 {
    margin-left: 5px;
    margin-top: 5px;
    margin-right: 5px;
  }
  
  #description,
  #name {
    margin-bottom: 5px;
    font-size: 13px;
  }
  
  .select-editproject {
    margin-right: 15px;
    margin-bottom: 15px;
    border-color: rgb(199, 199, 199);
    border-radius: 5px;
    height: 30px;
    width: 300px;
  }
  </style>