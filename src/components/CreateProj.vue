<template>
  <div>
    <div class="page-header mb-1">
      <h1 class="page-heading">Создание проекта</h1>
    </div>
    <div id='crproj' class="mx-auto border p-3 rounded">
      <b-form @submit.prevent="create">
        <div class="form-group">
          <label for="name">Название проекта:</label>
          <b-input v-model="form.name" type="text" id="name" placeholder="Назовите проект"></b-input>
        </div>

        <div class="form-group">
          <label for="description">Описание проекта:</label>
          <b-input v-model="form.description" type="text" id="description" placeholder="Расскажите о проекте"></b-input>
        </div>
        <div class="form-group">
          <label>Выберете руководителя:</label>
          <select class="select-prjleader" v-model="form.projectLeaderId" @change="selectUser">
            <option v-for="user in users" :key="user._id" :value="user._id">
              {{ user.surname }} {{ user.name }} {{ user.otch }}
            </option>
          </select>
        </div>
        <b-button class="btn-create-proj" variant="primary" type="submit">Создать</b-button>
      </b-form>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import router from '@/router/index.js';

export default {
  name: "CreateProject",
  data() {
    return {
      users: [],
      form: {
        name: "",
        description: "",
        projectLeaderId: null,
      }
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
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
      console.log('Выбран пользователь с ID:', this.form.projectLeaderId);
    },
    create() {
      if (this.form.projectLeaderId) {
        let data = {
          name: this.form.name,
          description: this.form.description,
          projectLeaderId: this.form.projectLeaderId
        };
        axios.post("/api/organization/createProject", data, {
          headers: {
            'authorization': `Bearer ${localStorage.access_token}`,
            'organizationId': localStorage.org_id
          }
        })
          .then(() => {
            this.$toast.success("Проект создан", {
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
            router.push("/organization/:id");
          })
          .catch((error) => {
            this.handleError(error);
          });
      } else {
        this.$toast.error('Руководитель не выбран', {
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
  }
};

</script>

<style>
#crproj {
  margin-top: 2%;
  height: 100%;
  width: 80%;
  font-size: 15px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
}

.page-heading {
  padding-left: 90px;
  padding-bottom: 40px;
}

.btn-create-proj {
  color: rgb(67, 67, 67) !important;
  background-color: rgb(168, 205, 234) !important;
  border-color: rgb(168, 205, 234) !important;
}

.select-prjleader {
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 20px;
  border-color: rgb(199, 199, 199);
  border-radius: 5px;
  height: 30px;
}

.form-group,
.mt-3 {
  margin-left: 15px;
  margin-top: 25px;
  margin-right: 15px;
}

label {
  margin-bottom: 10px;
  margin-right: 10px;
}

.link {
  text-decoration: none;
  color: rgb(167, 80, 124);
}
</style>