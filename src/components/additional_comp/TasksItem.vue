<template>
  <div>
    <li @click="goToTaskPage">
      {{ task.name }}
      <p class="stat-task">Статус: {{ task.status }}</p>
    </li>
  </div>
</template>

<script>

import router from '@/router/index.js';
export default {
  methods: {
    goToTaskPage() {
      localStorage.task_id = this.task._id;
      console.log(localStorage.task_id);
      router.push(`/task/page`);
    }
  },
  props: ['task']

};    
</script>

<style>
.stat-task {
  font-size: 12px;
  margin-bottom: 0;
}
</style>