<template>
  <div class="chart-container">
    <Pie :data="chartData" :options="chartOptions" v-if="chartDataLoaded"></Pie>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {
  name: 'TaskPieChart',
  components: {
    Pie
  },
  data() {
    return {
      chartData: {
        labels: [], // Task statuses
        datasets: [
          {
            label: 'Tasks',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            data: [] // Task counts
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartDataLoaded: false
    }
  },
  mounted() {
    this.loadTaskStatistics()
  },
  methods: {
    loadTaskStatistics() {
      axios
        .get('/api/project/statistics', {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            projectid: localStorage.proj_id,
          },
        })
        .then((response) => {
          console.log('Response data:', response.data) 
          if (response.data.taskStatusCount) {
            const statistics = response.data.taskStatusCount
            this.updateChartData(statistics)
          } else {
            console.error('Invalid response format:', response.data)
          }
        })
        .catch((error) => {
          console.error('Error loading task statistics:', error)
        })
    },
    updateChartData(statistics) {
      this.chartData.labels = Object.keys(statistics).map(status => this.getLabelForStatus(status))
      this.chartData.datasets[0].data = Object.values(statistics)
      this.chartDataLoaded = true
    },
    getLabelForStatus(status) {
      // Преобразование статуса в соответствующий лейбл
      switch (status) {
        case 'statusNew':
          return 'Новые'
        case 'statusInProcess':
          return 'В процессе'
        case 'statusDone':
          return 'Завершенные'
        default:
          return status // Возвращаем оригинальный статус, если нет соответствующего лейбла
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 200px;
  width: 500px;
}
</style>
