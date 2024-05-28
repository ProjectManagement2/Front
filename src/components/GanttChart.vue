<template>
    <div class="gantt-container">
      <GGanttChart
        :chart-start="ganttStartDate"
        :chart-end="ganttEndDate"
        precision="month"
      >
        <GGanttRow
          v-for="task in tasks"
          :key="task.id"
          :label="task.label"
          :bars="[{
            start: task.start,
            end: task.end
          }]"
          bar-start="start"
          bar-end="end"
        />
      </GGanttChart>
    </div>
  </template>
  
  <script>
  import { GGanttChart, GGanttRow } from 'vue-ganttastic';
  import axios from 'axios';
  
  export default {
    components: {
      GGanttChart,
      GGanttRow
    },
    data() {
      return {
        tasks: [],
        ganttStartDate: '',
        ganttEndDate: ''
      };
    },
    mounted() {
      this.loadTasks();
    },
    methods: {
      loadTasks() {
        axios
          .get('/api/project/getCalendarTasks', {
            headers: {
              authorization: `Bearer ${localStorage.access_token}`,
              projectid: localStorage.proj_id,
            },
          })
          .then((response) => {
            this.tasks = response.data.map((task) => ({
              id: task._id,
              label: task.name,
              start: new Date(task.createdDate).toISOString(),
              end: new Date(task.deadline).toISOString(),
            }));
            this.updateGanttDates();
          })
          .catch((error) => {
            console.error('Error loading tasks:', error);
          });
      },
      updateGanttDates() {
        if (this.tasks.length > 0) {
          const startDates = this.tasks.map(task => new Date(task.start));
          const endDates = this.tasks.map(task => new Date(task.end));
  
          const minStartDate = new Date(Math.min(...startDates));
          const maxEndDate = new Date(Math.max(...endDates));
  
          // Расширение диапазона дат на 1 месяц в каждую сторону
          minStartDate.setMonth(minStartDate.getMonth() - 1);
          maxEndDate.setMonth(maxEndDate.getMonth() + 1);
  
          this.ganttStartDate = minStartDate.toISOString().slice(0, 16);
          this.ganttEndDate = maxEndDate.toISOString().slice(0, 16);
        }
      }
    }
  };
  </script>
  
  <style>
  .gantt-container {
    width: 100%;
    height: 500px;
  }
  </style>
  