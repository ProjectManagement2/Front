<template>
    <div v-if="localIsVisible" id="add" class="w-75 mx-auto border p-3 rounded">
      <b-form @submit.prevent="editOrganization">
        <h3 class="name-form">Редактирование организаций</h3>
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
        <b-button variant="primary" class="btn-close-org-edit" type="submit">Редактировать</b-button>
        <b-button variant="primary" class="btn-close-org-edit" @click="closeForm">Закрыть</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
            name: "",
            description: "",
            leaderId: null,
        }
      };
    },
    methods: {
      editOrganization() {
        let data = {    
          name: this.form.name,    
          description: this.form.description,
          leaderId: this.form.leaderId    
        };
        if (this.form.leaderId){
          axios
          .patch("/api/admin/updateOrganization", data, {
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
        } else {
          console.warn('Ответственный за организацию не выбран');
        }
        
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
  .btn-close-org-edit{
    margin-top: 25px!important;
    margin-left: 15px!important;
    margin-bottom: 15px!important;
    color: rgb(67, 67, 67) !important;
    height: 40px;
    background-color: rgb(168, 205, 234) !important;
    border-color: rgb(168, 205, 234) !important;
    border-radius: 8px;
  } 
  .form-group, .mt-3{
      margin-left:5px;
      margin-top: 5px;
      margin-right: 5px;
  }
  #organization, #surname, #name, #otch{
    margin-bottom: 5px;
    font-size: 13px ; 
  }
</style>