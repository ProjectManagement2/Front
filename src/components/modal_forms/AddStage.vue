<template>
  <div v-if="localIsVisible">
    <div  id="add" class="w-75 mx-auto border p-3 rounded">
      <b-form @submit.prevent="addStage">
        <h3 class="name-form">Добавление этапа</h3>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="name">Название:</label>
              <b-input v-model="form.name" type="text" id="name" placeholder="Название этапа'"></b-input>
            </div>
            <div class="form-group">
              <label for="description">Описание:</label>
              <b-input v-model="form.description" type="text" id="description" placeholder="Расскажите об этапе"></b-input>
            </div>
            <div class="form-group">
              <label for="startDate">Начало этапа:</label>
              <b-input v-model="form.startDate" type="date" id="startDate"
                placeholder="Дата начала этапа: 01.01.2000"></b-input>
            </div>
            <div class="form-group">
              <label for="endDate">Окончание этапа:</label>
              <b-input v-model="form.endDate" type="date" id="endDate"
                placeholder="Дата завершения этапа: 01.01.2000"></b-input>
            </div>
            <div class="row form-group">
              <label>Выберете зависимость от этапа (необязательно):</label>
              <select v-model="form.relatedStage" @change="selectStage">
                <option v-for="stage in stages" :key="stage._id" :value="stage._id">
                  {{ stage.name }} 
                </option>
              </select>
            </div>
          </div>
        </div>
        <b-button variant="primary" class="btn-add-addstage" type="submit">Добавить</b-button>
        <b-button variant="primary" class="btn-close-addstage" @click="closeForm">Закрыть</b-button>
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
        
        form: {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            relatedStage: ""   
        }
      };
    },
    mounted(){
      this.getStages()
    },
    methods: {
      getStages() {
        axios
        .get("/api/project/getAllStages", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            projectid: localStorage.proj_id,
          },
        })
        .then((response) => {
          this.stages = response.data;
          console.log(this.stages);
        });
      },
      selectStage() {
        console.log('Выбран этап с ID:', this.form.relatedStage);
      },
      addStage() {
        let data = {    
          name: this.form.name,    
          description: this.form.description,
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          relatedStage: this.form.relatedStage
        };
        axios
        .post("/api/project/createStage", data , {
          headers: {
            'authorization': `Bearer ${localStorage.access_token}`,
            'projectid': localStorage.proj_id
          }
        })    
        .then(() => {    
          console.log("New stage is created");    
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
  #add{
    left: 50%;
    top: -150px;
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
  .name-form{
    font-size: 18px;
    margin: 5px;
    margin-bottom: 15px;
  }
  .btn-add-addstage, .btn-close-addstage{
    background-color: lightpink;
    font-size: 15px;
    color: rgb(67, 67, 67)!important;
    background-color: rgb(168, 205, 234) !important;
    border-color: rgb(168, 205, 234) !important;
    margin-right: 10px;
    margin-top: 20px;
    margin-left: 5px;
  } 
  .form-group, .row.form-group, .mt-3{
    margin-left:5px;
    margin-top: 5px;
    margin-right: 5px;
  }
  #organization, #description, #name, #otch, #startDate, #endDate{
    margin-bottom: 5px;
    font-size: 13px ; 
  }
</style>