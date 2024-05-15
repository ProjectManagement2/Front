<template>
  <div class="cld-container">
    <FullCalendar :options="calendarOptions" />
  </div> 
</template>
  
  <script>
  import FullCalendar from '@fullcalendar/vue';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction'
  import axios from 'axios';
  
  export default {
    components: {
      FullCalendar,
    },
    data() {
      return {
        calendarOptions: {
          plugins: [ dayGridPlugin, interactionPlugin ],
          initialView: 'dayGridMonth',
          events: [],
          height: '400px',
          
          aspectRatio: 2,
        },
        
      };
    },
    mounted() {
      this.loadTasks();
    },
    beforeDestroy() {
      this.$refs.fullCalendar.destroy();
    },
    methods: {
      formatDate(dateString) {
        const dateObject = new Date(dateString);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
      },
      loadTasks() {
        axios
        .get('/api/project/getCalendarTasks', {
            headers: {
                'authorization': `Bearer ${localStorage.access_token}`,
                'projectid': localStorage.proj_id
            }
        })
        .then(response => {
            this.events = response.data.map(task => ({
              end: task.deadline,
              start: task.createdDate, 
              title: task.name,
              backgroundColor: 'red',
              borderColor: 'black',
            }));
            console.log(this.events);
        })
        .catch(error => {
            console.error('Error loading tasks:', error);
        });
      },
      
    },
  };
  </script>

<style>
.cld-container{
  width: 800px;
}
</style>