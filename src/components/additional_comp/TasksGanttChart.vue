<template>
  <div class="gantt-container">
    <gantt-elastic :tasks="tasks" :options="options" :dynamic-style="dynamicStyle">
      <gantt-elastic-header slot="header"></gantt-elastic-header>
    </gantt-elastic>
  </div>
</template>

<script>
import GanttElastic from 'gantt-elastic';
import Header from "gantt-elastic-header";
import axios from 'axios';

export default {
  components: {
    'gantt-elastic': GanttElastic,
    'gantt-elastic-header': Header
  },
  data() {
    return {
      tasks: [],
      dynamicStyle: {
        'task-list-header-label': {
          'font-weight': 'bold',
        },
      },
      options: {
        
        maxRows: 100,
        maxHeight: 300,
        title: {
          label: 'Задачи',
          html: true,
        },
        row: {
          height: 24,
        },
        calendar: {
          hour: {
            display: false,
          },
        },
        chart: {
          progress: {
            bar: false,
          },
          expander: {
            display: true,
          },
        },
        taskList: {
          expander: {
            straight: false,
          },
          columns: [
            {
              id: 1,
              label: 'Название',
              value: 'label',
              width: 130,
              expander: true,
              html: true,
            },
            {
              id: 2,
              label: 'Исполнитель',
              value: 'user',
              width: 130,
              html: true,
            },
            {
              id: 3,
              label: 'Этап',
              value: 'stage',
              width: 130,
              html: true,
            },
          ],
        },
        locale: {
          name: 'en',
          weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ],
          daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        },
        barHeight: 36,
        rowHeight: 40,
        columnWidth: 100,
        step: 24,
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        headerHeight: 50,
        start: '',
        end: ''
      }
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
            'projectid': localStorage.proj_id,
          },
        })
        .then((response) => {
          this.tasks = response.data.map((task) => {
            const solutionOnTime = task.solution && new Date(task.solution.createdDate) <= new Date(task.deadline);
            return {
              id: task._id,
              label: task.name,
              dependentOn: [task.relatedTask],
              start: new Date(task.startDate).toISOString(),
              end: new Date(task.deadline).toISOString(),
              user: task.worker.surname,
              stage: task.stage.name,
              duration: 2 * 24 * 60 * 60 * 1000,
              progress: 50,
              type: 'task',
              solutionOnTime,
              style: this.getTaskStyle(task.status, solutionOnTime)
            };
          });
          console.log(this.tasks);
          this.updateGanttDates();
        })
        .catch((error) => {
          console.error('Error loading tasks:', error);
        });
    },
    getTaskStyle(status, solutionOnTime) {
      const baseStyle = {};
      switch (status) {
        case 'Новая':
          baseStyle.fill = 'lightblue';
          baseStyle.stroke = 'lightblue';
          break;
        case 'Выполняется':
          baseStyle.fill = '#ff6161';
          baseStyle.stroke = '#ff6161';
          break;
        case 'Завершена':
          baseStyle.fill = '#66ffb5';
          baseStyle.stroke = '#66ffb5';
          break;
        case 'Утверждена':
          baseStyle.fill = '#00ADB5';
          baseStyle.stroke = '#00ADB5';
          break;
        case 'Недоступна':
          baseStyle.fill = '#a8a8a8';
          baseStyle.stroke = '#a8a8a8';
          break;
        default:
          break;
      }
      if (status == 'Завершена' && !solutionOnTime) {
        baseStyle.stroke = 'red';
        baseStyle['stroke-width'] = 2;
      }
      return { base: baseStyle };
    },
    updateGanttDates() {
      if (this.tasks.length > 0) {
        const startDates = this.tasks.map(task => new Date(task.start));
        const endDates = this.tasks.map(task => new Date(task.end));

        const minStartDate = new Date(Math.min(...startDates));
        const maxEndDate = new Date(Math.max(...endDates));

        this.options.start = minStartDate.toISOString().split('T')[0];
        this.options.end = maxEndDate.toISOString().split('T')[0];
      }
    }
  }
};
</script>

<style>
.gantt-container {
  width: 100%;
  overflow: auto;
}
</style>
