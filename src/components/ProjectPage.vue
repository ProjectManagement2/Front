<template>
  <div class="page-holder">
    <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
      <div class="page-header mb-2">
        <h1 class="page-heading">Проект</h1>
      </div>
      <section>
        <div class="row">
          <div class="col-lg-4">
            <div class="row-lg-4">
              <div class="card mb-4">
                <div class="card-header">
                  <h4 class="card-heading">{{ posts.name }}</h4>
                </div>
                <p class="mb-3">
                  Инициатор проекта: {{ posts.initiator.surname }}
                  {{ posts.initiator.name }} {{ posts.initiator.otch }}
                </p>
                <p class="mb-3">Описание: {{ posts.description }}</p>
              </div>
              <div class="card mb-4">
                <div class="card-header">
                  <h4 class="card-heading">Статистика</h4>
                </div>
                <div v-if="statistics.tasksCount === 0" class="stat-null">
                  <span>Добавьте этапы и задачи для расчета статистики</span>
                </div>
                <div v-else>
                  <div class="row">
                    <TasksStatChart></TasksStatChart>
                  </div>
                  <div class="row">
                    <div class="stat-list">
                      <div class="col">
                        <p class="statistic-item">
                          Кол-во этапов: {{ statistics.stagesCount }}
                        </p>
                        <p class="statistic-item">
                          Кол-во задач: {{ statistics.tasksCount }}
                        </p>

                        <p class="statistic-item">
                          Просрочено задач: {{ statistics.overdueTasks }}
                        </p>
                        <p class="statistic-item">
                          Важных задач: {{ statistics.overdueTasks }}
                        </p>
                      </div>
                      <div class="col">
                        <p class="statistic-item">
                          "Новых" задач: {{ statistics.taskStatusCount.statusNew }}
                        </p>
                        <p class="statistic-item">
                          "Выполняется" задач: {{ statistics.taskStatusCount.statusInProcess }}
                        </p>
                        <p class="statistic-item">
                          "Завершено" задач: {{ statistics.taskStatusCount.statusDone }}
                        </p>
                        <p class="statistic-item">
                          "Недоступно" задач: {{ statistics.taskStatusCount.statusUnavailable }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="row">
              <div class="title-list">
                <b-button variant="primary" class="btn-proj" @click="showStages">Этапы и задачи</b-button>
                <b-button variant="primary" class="btn-proj" @click="showEmployees">Участники проекта</b-button>
                <b-button variant="primary" class="btn-proj" @click="showLeaders">Руководители проекта</b-button>
                <b-button variant="primary" class="btn-proj" @click="showCalendar">Диаграмма Ганта</b-button>
                <b-button variant="primary" class="btn-proj" @click="showChat">Чат</b-button>
              </div>
              <div v-if="currentTab === 'stage'">
                <div class="col">
                  <div class="inf-proj-stages">
                    <StagesList :stages="stages" />
                  </div>
                </div>
              </div>
              <div v-else-if="currentTab === 'employees'">
                <h4 class="part-name">Список участников</h4>
                <div class="col">
                  <div class="inf-proj">
                    <ul>
                      <li class="empl-item" v-for="employee in employees" :key="employee.id">
                        {{ employee.surname }} {{ employee.name }}
                        {{ employee.otch }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-else-if="currentTab === 'leaders'">
                <h4 class="part-name">Список руководителей</h4>
                <div class="col">
                  <div class="inf-proj">
                    <ul>
                      <li class="projleader-item" v-for="projectLeaders in leaders" :key="projectLeaders.id">
                        {{ projectLeaders.surname }} {{ projectLeaders.name }}
                        {{ projectLeaders.otch }}
                      </li>
                    </ul>
                  </div>
                  <div class="inf-proj">
                    <b-button v-if="access === true" variant="primary" class="btn-create-proj"
                      @click="showAddLP">Добавить
                      руководителя</b-button>
                  </div>
                  <AddLeaderProj :is-visible="isAddLPVisible" @close="closeAddLP" />
                </div>
              </div>
              <div v-else-if="currentTab === 'calendar'">
                <h4 class="part-name">Диаграмма Ганта</h4>
                <div class="col">
                  <div class="inf-proj">
                    
                    <TasksGanttChart/>
                  </div>
                </div>
              </div>
              <div v-else-if="currentTab === 'chat'">
                <h4 class="part-name">Чат проекта</h4>
                <div class="col">
                  <div class="inf-proj">
                    <ProjectChat />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import router from "@/router/index.js";
import StagesList from "./additional_comp/StagesList.vue";
import ProjectChat from "./additional_comp/ProjectChat.vue";
import TaskCalendar from "./additional_comp/TaskCalendar.vue";
import AddLeaderProj from "./modal_forms/AddLeaderProj.vue";
import TasksStatChart from "./additional_comp/TasksStatChart.vue";
import TasksGanttChart from "./additional_comp/TasksGanttChart.vue";

export default {
  name: "ProjectPage",
  components: {
    StagesList,
    ProjectChat,
    TaskCalendar,
    AddLeaderProj,
    TasksStatChart,
    TasksGanttChart
  },
  data() {
    return {
      isAddLPVisible: false,
      currentTab: "stage",
      posts: [],
      stages: [],
      employees: [],
      leaders: [],
      statistics: [],
      access: null,
    };
  },

  mounted() {
    axios
      .get("/api/project/mainInfo", {
        headers: {
          authorization: `Bearer ${localStorage.access_token}`,
          projectid: localStorage.proj_id,
        },
      })
      .then((response) => {
        this.posts = response.data;
        console.log(this.posts);
      }),
      this.getStages();
    this.getEmpl();
    this.getUserAccess();
    this.getLeaders();
    this.getStatistics();
  },

  methods: {
    getStatistics() {
      axios
        .get("/api/project/statistics", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            projectid: localStorage.proj_id,
          },
        })
        .then((response) => {
          this.statistics = response.data;
          console.log(this.statistics);
        })
    },
    getUserAccess() {
      axios
        .get("/api/access/checkProjectLeader", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            projectid: localStorage.proj_id,
          },
        })
        .then((response) => {
          this.access = response.data.access;
          console.log(this.access);
        });
    },
    getStages() {
      axios
        .get("/api/project/getAllStages", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            projectid: localStorage.proj_id,
          },
        })
        .then((response) => {
          this.stages = response.data;
          console.log(this.stages);
        });
    },

    getEmpl() {
      axios
        .get("/api/project/getProjectMembers", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            organizationId: localStorage.org_id,
            projectid: localStorage.proj_id,
          },
        })
        .then((response) => {
          this.employees = response.data;
          console.log(this.employees);
        });
    },

    getLeaders() {
      axios
        .get("/api/project/getProjectLeaders", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            projectid: localStorage.proj_id,
          },
        })
        .then((response) => {
          this.leaders = response.data;
          console.log(this.leaders);
        });
    },
    
    showStages() {
      this.currentTab = "stage";
    },

    showEmployees() {
      this.currentTab = "employees";
    },

    showLeaders() {
      this.currentTab = "leaders";
    },

    showCalendar() {
      this.currentTab = "calendar";
    },

    showChat() {
      this.currentTab = "chat";
    },
    showAddLP() {
      this.isAddLPVisible = true;
    },
    closeAddLP() {
      this.isAddLPVisible = false;
    }
  },
};
</script>

<style>
.card-header:first-child {
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
}

.card-header {
  position: relative;
  padding: 2rem 2rem;
  border-bottom: none;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  z-index: 2;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}

.bg-gray-100 {
  background-color: #f8f9fa !important;
}

body {
  font-family: "Poppins";
}

.stat-list {
  margin-top: 30px !important;
  display: flex;
  flex-direction: row;
}

.statistic-item {
  margin-left: 15px;
}

.text-primary {
  color: lightpink;
}

h1,
.h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  line-height: 1.2;
}

.text-muted {
  color: #6c757d !important;
}

.lead {
  font-size: 1.125rem;
  font-weight: 300;
}

.text-sm {
  font-size: 0.7875rem !important;
}

h3,
.h3 {
  font-size: 1.575rem;
}

.page-holder {
  display: flex;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 72px);
  margin-bottom: 1%;
  flex-wrap: wrap;
}



.form-control {
  color: #343a40;
}

.page-heading {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
  font-size: 31px;
}

.card-profile .card-header {
  height: 9rem;
  background-position: center center;
  background-size: cover;
}

.form-label-org {
  border: 1px solid #b2b6ba;
  border-radius: 7px;
  font-size: 17px;
  size: 150px;
  margin: 15px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.mb-3 {
  margin: 15px;
}

.btn-proj {
  background-color: #fff !important;
  border: none !important;
  margin-left: 4% !important;
  margin-right: 4% !important;
  margin-top: 0;
  color: black !important;
  font-size: 15px !important;
  font-weight: 600 !important;
}

.title-list {
  display: flex;
  justify-content: center;
  position: relative;
  width: 95%;
}

.part-name {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 25px;
}

.inf-proj {
  display: flex;
  justify-content: center;
  width: 100% !important;
}

.stat-null{
  margin: 20px;
}

.empl-item, .projleader-item {
  padding-left: 0;
  list-style-type: none;
  margin: 10px;
  padding: 5px;
  width: 380px;
  color: black;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
  font-weight: 500;
  border: 1px solid rgb(155, 155, 155);
  border-radius: 10px;
}

.empl-item :hover {
  background-color: rgba(205, 226, 234, 0.421)
}

.projleader-item :hover {
  background-color: rgba(205, 226, 234, 0.421)
}
</style>
