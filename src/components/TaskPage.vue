<template>
  <div class="page-holder">
    <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
      <div class="page-header mb-2">
        <h1 class="page-heading">Задача</h1>
      </div>
      <section>
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <div class="card-header">
                <h4 class="card-heading">{{ task.name }}</h4>
              </div>
              <p class="mb-3">{{ task.description }}</p>
              <p class="mb-3">Дедлайн: {{ formatDate(task.deadline) }}</p>
              <p class="mb-3">Статус: {{ task.status }}</p>
              <div class="attached-files">
                <h5 class="file-title">Прикрепленные файлы</h5>
                <ul>
                  <li v-for="file in task.files" :key="file.id">
                    <a class="link-file" @click.prevent="downloadFile(file.filename)" href="#"
                      :download="file.filename">{{ file.filename }}</a>
                  </li>
                </ul>
              </div>
              <div v-if="task.solution.text != null || task.solution.files != null"class="attached-solution">
                <h5 class="file-title">Прикрепленный отчет</h5>
                <h6>{{ task.solution.text }}</h6>
                <h6 class="file-title">Файлы отчета:</h6>
                <ul>
                  <li v-for="file in task.solution.files" :key="file.id">
                    <a class="link-file" @click.prevent="downloadFile(file.filename)" href="#"
                      :download="file.filename">{{ file.filename }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="row">
              <div class="task-edit-container">
                <form class="task-edit-elem" @submit.prevent="submitSolution">
                  <h4 class="task-edit-title">Отчет по задаче</h4>
                  <textarea v-model="form.solutionText" placeholder="Введите текст отчета"></textarea>
                  <input type="file" id="file" ref="fileInput" multiple />
                  <div class="col">
                    <h6 class="status-title">Выберете статус задачи:</h6>
                    <select v-model="status">
                      <option value="выполняется">Выполняется</option>
                      <option value="завершена">Завершена</option>
                    </select>
                  </div>
                  <b-button class="btn-addresult" type="submit" >Отправить решение</b-button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TaskPage",
  data() {
    return {
      task: {},
      solutionText: "",
      solutionFiles: [],
      form: {
        solutionText: "",
      },
    };
  },
  mounted() {
    this.getTask();
  },
  methods: {
    getTask() {
      axios
        .get("/api/task/taskInfo", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            taskid: localStorage.task_id,
          },
        })
        .then((response) => {
          this.task = response.data;
        });
    },
    formatDate(dateString) {
      const dateObject = new Date(dateString);
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month
        }.${year}`;
    },
    submitSolution() {
      let formData = new FormData();

      formData.append("text", this.form.solutionText);

      // Добавляем выбранные файлы к formData
      if (this.$refs.fileInput.files.length > 0) {
        for (let i = 0; i < this.$refs.fileInput.files.length; i++) {
          let file = this.$refs.fileInput.files[i];
          formData.append("files", file);
        }
      }

      // Отправляем данные на сервер
      
        axios
          .patch("/api/task/updateSolution", formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Устанавливаем Content-Type как multipart/form-data для передачи файлов
              authorization: `Bearer ${localStorage.access_token}`,
              taskid: localStorage.task_id,
            },
          })
          .then(() => {
            console.log("New solution is created");
            window.location.reload();
          })
          .catch((errors) => {
            console.log(errors);
          });
      
        
    },
    downloadFile(filename) {
      const url = `http://localhost:4444/download/${filename}`;
      console.log(url);
      axios({
        url,
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    },
  },
};
</script>

<style scoped>
.task-page-container {
  display: flex;
}

.task-info-container {
  flex: 1;
  padding-right: 20px;
  margin-top: 4%;
  margin-left: 2%;
  margin-right: 2%;
  padding-top: 2%;
  padding-left: 2%;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 10px;
  width: 70%;
  height: 80%;
}

.task-edit-container {
  margin-left: 5%;
  margin-right: 2%;
  padding: 2%;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 10px;
  width: 90%;
  height: 90%;
}

.task-edit-elem {
  display: flex;
  flex-direction: column;
  margin: 1%;
}

.task-edit-title {
  margin-bottom: 30px !important;
}

.status-title {
  margin-top: 15px;
  margin-bottom: 15px;
}

.task-details {
  margin-bottom: 20px;
}

.attached-files, .attached-solution {
  margin-bottom: 20px;
  margin-left: 20px;
  margin-top: 20px;
}

.file-title {
  margin-bottom: 25px;
}

textarea {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}

select {
  margin-bottom: 10px;
}

.btn-addresult {
  color: rgb(67, 67, 67) !important;
  background-color: rgb(168, 205, 234) !important;
  border-color: rgb(168, 205, 234) !important;

  cursor: pointer;
  width: 25%;
}

.link-file {
  color: rgb(64, 64, 64);
  text-decoration: none;
  font-size: 12px;
}

.link-file :hover {
  background-color: #0095dffd;
}
</style>
