<template>
  <div v-if="localIsVisible">
    <div id="edit" class="w-75 mx-auto border p-3 rounded">
      <b-form @submit.prevent="editTask">
        <h3 class="name-form">Редактирование задачи</h3>
        <div class="row">
          <div class="col">
            <div class="row form-group">
              <label>Выберете задачу, которую хотите изменить:</label>
              <select class="select-edittask" v-model="form.TaskId" @change="selectTask">
                <option v-for="task in tasks" :key="task._id" :value="task._id">
                  {{ task.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="name">Название:</label>
              <b-input v-model="form.name" type="text" id="name" placeholder="Новое название задачи"></b-input>
            </div>
            <div class="form-group">
              <label for="description">Описание:</label>
              <b-input v-model="form.description" type="text" id="description"
                placeholder="Новое описание задачи"></b-input>
            </div>
            <div class="form-group">
              <label for="startDate">Начало задачи:</label>
              <b-input v-model="form.startDate" type="date" id="startDate"
                placeholder="Дата начала задачи: 01.01.2000"></b-input>
            </div>
            <div class="form-group">
              <label for="deadline">Окончание задачи:</label>
              <b-input v-model="form.deadline" type="date" id="deadline"
                placeholder="Дата завершения задачи: 01.01.2000"></b-input>
            </div>
          </div>
        </div>
        <b-button variant="primary" class="btn-edit-edittask" type="submit">Сохранить</b-button>
        <b-button variant="primary" class="btn-close-edittask" @click="closeForm">Закрыть</b-button>
      </b-form>
    </div>
    <div class="overlay" @click="closeForm"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      form: {
        name: "",
        description: "",
        startDate: "",
        deadline: "",
        TaskId: ""
      },
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios
        .get("/api/project/getAllTasks", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            stageid: this.stageId,
          },
        })
        .then((response) => {
          this.tasks = response.data;
        });
    },

    selectTask() {
      console.log("Выбрана задача с ID:", this.form.TaskId);
    },

    editTask() {
      if (this.form.TaskId) {
        let data = {    
          name: this.form.name,    
          description: this.form.description,
          startDate: this.form.startDate,
          deadline: this.form.deadline
        };
        axios
          .patch("/api/project/updateTask", data, {
            headers: {
              'authorization': `Bearer ${localStorage.access_token}`,
              'projectid': localStorage.proj_id,
              'stageid': this.stageId,
              'taskid': this.form.TaskId
            },
          })
          .then(() => {
            
            console.log("Задача обновлена");
            window.location.reload();
          })
          .catch((errors) => {
            console.log(errors);
          });
      } else {
        console.warn("Задача не выбрана");
      }
    },

    closeForm() {
      this.$emit("close");
    },
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    stageId: {
      type: String,
      required: true,
    },
  },
  computed: {
    localIsVisible() {
      return this.isVisible;
    },
  },
};
</script>

<style scoped>
#edit {
  left: 50%;
  top: -300px;
  background-color: white;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 13px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 1000;
  /* Позиция по z-index - поверх всего остального контента */
  transition: transform 0.3s ease;
  /* Анимация для открытия/закрытия меню */
  transform: translateX(-100%);
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

.btn-edit-edittask,
.btn-close-edittask {
  font-size: 15px;
  color: rgb(67, 67, 67) !important;
  background-color: rgb(168, 205, 234) !important;
  border-color: rgb(168, 205, 234) !important;
  margin-right: 10px;
  margin-top: 10px;
}

.form-group,
.row.form-group,
.mt-3 {
  margin-left: 5px;
  margin-top: 5px;
  margin-right: 5px;
}

#name,
#description,
#startDate,
#deadline,
#checkbox,
#tags,
#file {
  margin-bottom: 5px;
  font-size: 13px;
}

.select-edittask {
  margin-right: 15px;
  margin-bottom: 15px;
  border-color: rgb(199, 199, 199);
  border-radius: 5px;
  height: 30px;
  width: 300px;
}
</style>
