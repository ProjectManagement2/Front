<template>
  <div>
    <div class="page-header mb-2">
      <h1 class="page-heading">Календарь задач</h1>
    </div>
    <div class="cld-container">
      <FullCalendar :options="calendarOptions" />
    </div>
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
        .get("/api/profile/userTasks", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
          },
        })
        .then(response => {
          console.log('API response:', response.data);
          const events = [];
          response.data.forEach(task => {
            events.push({
              title: `${task.name}`,
              start: task.startDate.split('T')[0],
              end: task.deadline.split('T')[0],
              backgroundColor: this.getRandomLightColor(),
              borderColor: this.getRandomLightColor(),
              textColor: '#000000'
            });
          });

          this.calendarOptions.events = events;
        })
        .catch(error => {
          console.error('Error loading tasks:', error);
        });
    },
    getRandomLightColor() {
      const getComponent = () => Math.floor(Math.random() * 156 + 100); // Get value between 100 and 255
      const red = Math.floor(Math.random() * 56 + 200); // Get value between 200 and 255 for light colors
      const green = getComponent();
      const blue = getComponent();
      return `rgb(${red}, ${green}, ${blue})`;
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
  margin-top: 60px;
  margin-right: 20px;
}

.event-content {
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.event-content:hover {
  background-color: #1565C0;
}
</style>
