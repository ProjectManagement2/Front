<template>
  <div>
    <div v-if="task.status === 'Недоступна'">
      <li class="task-bloked">
        {{ task.name }}
        <p class="stat-task">Статус: {{ task.status }}</p>
      </li>
    </div>
    <div v-else>
      <li class="task-item" @click="goToTaskPage">
        {{ task.name }}
        <p class="stat-task">Статус: {{ task.status }}</p>
      </li>
    </div>

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

.task-item {
  padding-left: 0;
  list-style-type: none;
  margin: 10px;
  padding: 5px;
  width: 180px;
  color: black;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
  font-weight: 500;
  border: 1px solid rgb(155, 155, 155);
  border-radius: 10px;
}



.task-bloked {
  background-color: rgb(170, 170, 170) ;
  padding-left: 0;
  list-style-type: none;
  margin: 10px;
  padding: 5px;
  width: 180px;
  color: black;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
  font-weight: 500;
  border: 1px solid rgb(155, 155, 155);
  border-radius: 10px;
}

.task-bloked :hover {
  background-color: rgb(170, 170, 170);
}
</style>