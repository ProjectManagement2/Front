<template>
    <div v-if="localIsVisible">
      <ul>
        <li v-for="(task, id) in tasks" :key="id">
          <div>{{ task.name }}</div>
          <div>{{ task.description }}</div>
        </li>
      </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      tasks: []
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks(){
        axios
          .get('/api/project/getAllTasks', {
            headers: {
              'authorization': `Bearer ${localStorage.access_token}`,
              'stageid': localStorage.stage_id
            }
          })
          .then((response) => {
            this.tasks = response.data
          });
    }
  },
  props: {
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