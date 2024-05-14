<template>
    <div >
      <li @click="goToTaskPage">{{ task.name }}</li>
      
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