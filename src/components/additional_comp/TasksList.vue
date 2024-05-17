<template>
  <div v-if="localIsVisible" class="list-tasks">
    <ul>
      <TasksItem v-for="task in tasks" :key="task._id" :task="task" />
    </ul>
  </div>
</template>

<script>
import TasksItem from './TasksItem.vue';

export default {
  components: {
    TasksItem
  },

  props:
  {
    tasks: Array,
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

<style>

ul {
  margin-left: 0;
  padding-left: 0 !important;
}
</style>