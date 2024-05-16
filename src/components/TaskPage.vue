<template>
  <div class="task-page-container">
    <!-- Левый блок с информацией о задаче -->
    <div class="task-info-container">
      <!-- Вывод информации о задаче -->
      <div class="task-details">
        <h2>{{ task.name }}</h2>
        <p>{{ task.description }}</p>
        <p>Дедлайн: {{ formatDate(task.deadline) }}</p>
        <p>Статус: {{ task.status }}</p>
      </div>

      <!-- Прикрепленные файлы -->
      <div class="attached-files">
        <h3>Прикрепленные файлы</h3>
        <ul>
          <li v-for="file in task.files" :key="file.id">
            <a @click.prevent="downloadFile(file.filename)" href="#" :download="file.filename">{{ file.filename }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Правый блок с формой для редактирования задачи -->
    <div class="task-edit-container">
      <!-- Форма для редактирования задачи -->
      <form @submit.prevent="submitSolution">
        <h2>Решение задачи</h2>
        <!-- Поле для ввода текста решения -->
        <textarea v-model="solutionText" placeholder="Введите текст решения"></textarea>

        <!-- Поле для прикрепления файлов -->
        <input type="file" multiple accept=".jpg, .jpeg, .png, .pdf" >

        <!-- Выбор статуса задачи -->
        <select v-model="task.status">
          <option value="выполняется">Выполняется</option>
          <option value="завершена">Завершена</option>
        </select>

        <!-- Кнопка для отправки решения -->
        <button type="submit">Отправить решение</button>
      </form>
    </div>
  </div>
</template>

<script>
 import axios from 'axios';
export default {
  name: "TaskPage",
  data() {
    return {
      task: {},
      solutionText: '',
      solutionFiles: []
    };
  },
  mounted(){
      this.getTask();
  },
  methods: {
    getTask() {
      axios
          .get('/api/task/taskInfo', {
              headers: {
              'authorization': `Bearer ${localStorage.access_token}`,
              'taskid': localStorage.task_id
              }
          })
          .then((response) => {
              this.task = response.data
          });
    },
    formatDate(dateString) {
      const dateObject = new Date(dateString);
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    },
    submitSolution() {
      // Ваша логика отправки решения задачи на сервер
    },
    downloadFile(filename) {
    const url = `http://localhost:4444/download/${filename}`;
    console.log(url);
    axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
  }
  }
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
  margin-left:2%;
  margin-right: 2%;
  padding-top: 2%;
  padding-left: 2%;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 10px;
  width: 70%;
  height: 80%;
}

.task-edit-container {
  flex: 1;
  margin-top: 4%;
  margin-left:2%;
  margin-right: 2%;
  padding: 2%;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 10px;
  width: 70%;
  height: 80%;
}

.task-details {
  margin-bottom: 20px;
}

.attached-files {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}

select {
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
