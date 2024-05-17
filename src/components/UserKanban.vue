<template>
  <div class="kanban-board">
    <div class="column" v-for="(tasks, status) in taskStatuses" :key="status">
      <h2>{{ status }}</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id" @dragstart="dragStart(task)" draggable>
          {{ task.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Ваши данные о задачах и статусах
    };
  },
  methods: {
    // Метод для обновления статуса задачи на сервере
    updateTaskStatus(taskId, newStatus) {
      axios.patch(`/api/tasks/${taskId}`, { status: newStatus })
        .then(response => {
          console.log('Статус задачи успешно обновлен');
        })
        .catch(error => {
          console.error('Ошибка при обновлении статуса задачи:', error);
        });
    },
    // Обработчик события при завершении перемещения задачи
    handleTaskDrop(taskId, newStatus) {
      this.updateTaskStatus(taskId, newStatus);
    }
  }
};
</script>

<style>
.kanban-board {
  display: flex;
  justify-content: space-around;
}

.column {
  width: 30%;
  border: 1px solid #ccc;
  padding: 10px;
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