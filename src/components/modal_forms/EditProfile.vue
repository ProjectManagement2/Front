<template>
  <div v-if="localIsVisible">
    <div id="add">
      <b-form @submit.prevent="editProfile" class="card mb-4">
        <div class="card-header">
          <h4 class="card-heading">Редактировать</h4>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <div class="col">
              <div class="col-auto d-flex align-items-center">
                <img class="avatar avatar-lg p-1"
                  src="https://i.pinimg.com/originals/e3/41/40/e34140dc81a93041f8ae93e6b87b3c6c.jpg" alt="Avatar">
              </div>
              <div class="col">
                <label class="form-label">Имя</label>
                <b-input v-model="form.name" type="name" id="name"
                placeholder="Имя..."></b-input>
                
                <label class="form-label">Фамилия</label>
                <b-input v-model="form.surname" type="surname" id="surname"
                placeholder="Фамилия..."></b-input>
                
                <label class="form-label">Отчество</label>
                <b-input v-model="form.otch" type="otch" id="otch"
                placeholder="Отчество..."></b-input>
                
              </div>
            </div>
            <div class="col">
              
              <div class="mb-3">
                <label class="form-label">Дата рождения</label>
                <b-input v-model="form.date" type="date" id="date"
                placeholder="01.01.2000"></b-input>
              </div>
              <div class="mb-3">
                <label class="form-label">Почта</label>
                <b-input v-model="form.email" type="email" id="email"
                placeholder="email@email.com"></b-input>
                
              </div>
              <div class="mb-3">
                <label class="form-label">Пароль</label>
                <b-input v-model="form.password" type="password" id="password"
                   value="password"></b-input>
                
              </div>
              
            </div>
          </div>
        </div>
        <div class="card-footer text-end">
          <b-button variant="primary" class="btn-save-editprofile">Сохранить</b-button>
          <b-button variant="primary" class="btn-close-editprofile" @click="closeForm">Закрыть</b-button>
        </div>
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
        surname: "",
        name: "",
        otch: "",
        date: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    editProfile() {
      let data = {
        surname: this.form.surname,
        name: this.form.name,
        otch: this.form.otch,
        date: this.form.date,
        email: this.form.email,
        newPassword: this.form.password
      };
      console.log(data);
      axios
        .patch("/api/profile/updateUserInfo", data, {
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
        window.location.reload();
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
#add {
  font-size: 13px;
  position: fixed;
  top: 5%;
  left: 75%;
  width: 50%;
  /* Ширина бокового меню */
  height: 60%;
  background-color: white;
  /* Цвет фона бокового меню */
  z-index: 1000;
  /* Позиция по z-index - поверх всего остального контента */
  transition: transform 0.3s ease;
  /* Анимация для открытия/закрытия меню */
  transform: translateX(-100%);
  border-radius: 1rem;

}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Прозрачный чёрный цвет */
  z-index: 999;
  /* Позиция по z-index - под боковым меню, но поверх остального контента */
}

.name-form {
  font-size: 18px;
  margin: 5px;
  margin-bottom: 15px;
}

.btn-save-editprofile,
.btn-close-editprofile {
  background-color: rgb(168, 205, 234) !important;
  border-color: rgb(168, 205, 234) !important;
  color: rgb(65, 65, 65);
  border: 1px;
  margin-right: 10px;
  border-radius: 5px;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 7px;
  padding-right: 7px;
  font-size: 15px;
}

.form-group,
.row.form-group,
.mt-3 {
  margin-left: 5px;
  margin-top: 5px;
  margin-right: 5px;
}

#password,
#surname,
#name,
#otch, #date, #email {
  margin-bottom: 5px;
  font-size: 13px;
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

body {
  font-family: 'Poppins';
}

img,
svg {
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

.form-control {
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
</style>