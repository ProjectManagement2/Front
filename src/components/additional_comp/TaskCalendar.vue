<template>
  <div class="cld-container">
    <FullCalendar :options="calendarOptions" />
  </div> 
</template>
  
<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru'; // Импортируем русскую локализацию
import axios from 'axios';

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: [],
        locale: ruLocale, // Устанавливаем русскую локализацию
        height: 'auto',
        width: 'auto',
        aspectRatio: 2,
        eventContent: this.renderEventContent,
      },
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
            'authorization': `Bearer ${localStorage.access_token}`,
            'projectid': localStorage.proj_id
          }
        })
        .then(response => {
          const events = [];
          response.data.forEach(task => {
            events.push({
              title: `${task.name}`,
              start: task.createdDate.split('T')[0],
              end: task.deadline.split('T')[0],
            });
          });

          this.calendarOptions.events = events;
        })
        .catch(error => {
          console.error('Error loading tasks:', error);
        });
    },
    renderEventContent(eventInfo) {
      return {
        html: `<div class="event-content">${eventInfo.event.title}</div>`
      };
    },
  },
};
</script>

<style>
.cld-container {
  overflow: hidden;
  
}

.event-content {
  padding: 5px;
  background-color: #86b5da;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  cursor: pointer;
}

.event-content:hover {
  background-color: #1565C0;
}
</style>
