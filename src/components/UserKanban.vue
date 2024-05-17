<template>
  <div>
    <div class="page-header mb-2">
      <h1 class="page-heading">Канбан-доска задач</h1>
    </div>
    <div class="kanban-board">
    <div class="column" v-for="(tasks, status) in taskStatuses" :key="status" @dragover.prevent
      @drop="dropTask(status)" :class="getColumnClass(status)">
      <h4 class="status-name">{{ status }}</h4>
      <ul>
        <li v-for="task in tasks" :key="task.id" @dragstart="dragStart(task)" draggable>
          <p>{{ task.name }}</p>
          <p>Описание:</p>
          <p>{{ task.description }}</p>
          <p>Дедлайн: {{ formatDate(task.deadline) }}</p>
        </li>
      </ul>
    </div>
  </div>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: "UserKanban",
  data() {
    return {
      tasks: [],
      taskStatuses: {
        'Новая': [],
        'Выполняется': [],
        'Завершена': []
      },
      draggedTask: null
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios
        .get("/api/profile/userTasks", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
          },
        })
        .then((response) => {
          this.tasks = response.data;
          this.updateTaskStatuses(); // Обновляем статусы после загрузки задач
          console.log("Tasks are loaded", this.tasks);
        })
        .catch(error => {
          console.error("Error loading tasks:", error);
        });
    },
    updateTaskStatuses() {
      // Инициализация колонок задач
      this.taskStatuses = {
        'Новая': [],
        'Выполняется': [],
        'Завершена': []
      };
      this.tasks.forEach(task => {
        if (this.taskStatuses[task.status]) {
          this.taskStatuses[task.status].push(task);
        }
      });
    },
    dragStart(task) {
      console.log("Drag Start Task ID:", task._id);
      this.draggedTask = task;
    },
    dropTask(newStatus) {
      if (this.draggedTask) {
        const oldStatus = this.draggedTask.status;
        const taskId = this.draggedTask._id;
        this.draggedTask.status = newStatus;


        // Обновление статуса задачи на сервере
        axios
          .patch('/api/task/changeStatus', {
            status: newStatus
          }, {
            headers: {
              authorization: `Bearer ${localStorage.access_token}`,
              taskid: this.draggedTask._id,
            },
          })
          .then(() => {
            // Обновление локального состояния задач
            this.tasks = this.tasks.map(task => {
              if (task._id === taskId) {
                task.status = newStatus;
              }
              return task;
            });
            this.updateTaskStatuses();
            this.draggedTask = null;
          })
          .catch(error => {
            console.error('Error updating task status:', error);
            // Восстановление старого статуса в случае ошибки
            this.draggedTask.status = oldStatus;
            this.draggedTask = null;
          });
      }
    },
    formatDate(dateString) {
      const dateObject = new Date(dateString);
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month
        }.${year}`;
    },
    getColumnClass(status) {
      return {
        'new-column': status === 'Новая',
        'in-progress-column': status === 'Выполняется',
        'done-column': status === 'Завершена'
      };
    }
  }
};
</script>

<style>
.kanban-board {
  display: flex;
  justify-content: space-around;
  margin-top: 3%;
}

.column {
  width: 30%;
  border: 1px solid #ccc;
  border-width: 0 1px 0 1px;
  padding: 10px;
}
.new-column {
  background-color: #e0f7fa;
}

.in-progress-column {
  background-color: #fff3e0;
}

.done-column {
  background-color: #e8f5e9;
}
.status-name{
  color:rgb(83, 83, 83);
  text-align: center;
  margin-bottom: 8%;
}
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  background-color: #f9f9f9;
  padding: 5px;
  cursor: pointer;
}
</style>
