<template>
    <div v-if="localIsVisible">
      <div  id="edit" class="w-75 mx-auto border p-3 rounded">
        <b-form @submit.prevent="editStage">
          <h3 class="name-form">Редактирование этапа</h3>
          <div class="row">
            <div class="col">
              <div class="row form-group">
                <label>Выберете этап, который хотите изменить:</label>
                <select class="select-editstage" v-model="form.StageId" @change="selectStage">
                  <option v-for="stage in stages" :key="stage._id" :value="stage._id">
                    {{ stage.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="name">Название:</label>
                <b-input v-model="form.name" type="text" id="name" placeholder="Новое название этапа"></b-input>
              </div>
              <div class="form-group">
                <label for="description">Описание:</label>
                <b-input v-model="form.description" type="text" id="description" placeholder="Новое описание этапа"></b-input>
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
            </div>
          </div>
          <b-button variant="primary" class="btn-edit-editstage" type="submit">Сохранить</b-button>
          <b-button variant="primary" class="btn-close-editstage" @click="closeForm">Закрыть</b-button>
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
          stages: [],
          form: {
              name: "",
              description: "",
              startDate: "",
              endDate: "",
              StageId: ""  
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
          })
          .catch((error) => {
            this.handleError(error);
          });
        },
        selectStage() {
          console.log('Выбран этап с ID:', this.form.StageId);
        },
        editStage() {
          if (this.form.StageId){
            let data = {    
              name: this.form.name,    
              description: this.form.description,
              startDate: this.form.startDate,
              endDate: this.form.endDate
            };
            axios
            .patch("/api/project/updateStage", data , {
              headers: {
                'authorization': `Bearer ${localStorage.access_token}`,
                'projectid': localStorage.proj_id,
                'stageid': this.form.StageId
              }
            })    
            .then(() => {
              window.location.reload();
              this.$toast.success("Данные этапа обновлены", {
                position: "top-right",
                timeout: 7000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
              });
            })
            .catch((error) => {
              this.handleError(error);
            });
          } else {
            this.$toast.error('Этап не выбран', {
              position: "top-right",
              timeout: 7000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false
            });
          }
          
        },
        handleError(error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.$toast.error(error.response.data.message, {
              position: "top-right",
              timeout: 7000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false
            });
          } else {
            this.$toast.error('Неизвестная ошибка');
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
    
  <style scoped>
    #edit{
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
    .btn-edit-editstage, .btn-close-editstage{
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
    #description, #name, #otch, #startDate, #endDate{
      margin-bottom: 5px;
      font-size: 13px ; 
    }
    .select-editstage {
      margin-right: 15px;
      margin-bottom: 15px;
      border-color: rgb(199, 199, 199);
      border-radius: 5px;
      height: 30px;
      width: 300px;
    }
  </style>