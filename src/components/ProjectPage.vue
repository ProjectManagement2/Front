<template>
    <div class="page-holder">
          <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
              <div class="page-header mb-2">
                <h1 class="page-heading">Проект</h1>
              </div>
              <section>
                <div class="row">
                  <div class="col-lg-4">
                    <div class="card mb-4">
                      <div class="card-header">
                        <h4 class="card-heading">{{ posts.name }}</h4>
                      </div>
                      <p class="mb-3">Инициатор проекта: {{ posts.initiator.surname }} {{posts.initiator.name}} {{posts.initiator.otch}}</p>
                      <p class="mb-3">Описание: {{ posts.description }}</p>
                      
                    </div> 
                  </div>
                  <div class="col-lg-8">
                    <div class="row">
                      <div class="title-list">
                        <b-button variant="primary" class="btn-proj" @click="showStages">Этапы и задачи</b-button>
                        <b-button variant="primary" class="btn-proj" @click="showEmployees">Участники</b-button>
                        <b-button variant="primary" class="btn-proj" @click="showLeaders">Руководители проекта</b-button>
                        <b-button variant="primary" class="btn-proj" @click="showCalendar">Календарь</b-button>
                        <b-button variant="primary" class="btn-proj" @click="showChat">Чат</b-button>
                      </div>
                      <div v-if="currentTab === 'stage'">
                        <div class="col">
                          <div class="inf-proj">
                            <StagesList :stages="stages" />
                          </div>
                        </div>
                      </div>
                      <div v-else-if="currentTab === 'employees'">
                        <h4 class="part-name">Список сотрудников</h4>
                        <div class="col">
                          <div class="inf-proj">
                            <ul>
                              <li v-for="employee in employees" :key="employee.id">{{ employee.surname }} {{ employee.name }} {{ employee.otch }}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div v-else-if="currentTab === 'leaders'">
                        <h4 class="part-name">Список руководителей</h4>
                        <div class="col">
                          <div class="inf-proj">
                            <p class="mb-3">{{ posts.leader.surname }} {{posts.leader.name}} {{posts.leader.otch}}</p>
                            
                          </div>
                          <div class="inf-proj">
                            <b-button variant="primary"class="btn-create-proj" >Добавить руководителя</b-button>
                          </div>
                        </div>
                      </div>
                      <div v-else-if="currentTab === 'calendar'">
                        <h4 class="part-name">Календарь задач</h4>
                        <div class="col">
                          <div class="inf-proj">
                            
                            
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
import axios from 'axios';
import router from '@/router/index.js';
import StagesList from "./additional_comp/StagesList.vue";
import ProjectChat from "./additional_comp/ProjectChat.vue";

export default {
  name: "ProjectPage",
  components: {
    StagesList,
    ProjectChat
  },
  data() {
    return {
      currentTab: 'stage',
      posts: [],
      stages:[],
      employees: []
    }
  },
  
  mounted() {
    axios
      .get('/api/project/mainInfo', {
        headers: {
          'authorization': `Bearer ${localStorage.access_token}`,
          'projectid': localStorage.proj_id
        }
      })
      .then((response) => {
        this.posts = response.data
        console.log(this.posts)
      }),
    this.getStages();
    this.getEmpl();
  },

  methods: {
    getStages(){
      axios
      .get('/api/project/getAllStages', {
        headers: {
          'authorization': `Bearer ${localStorage.access_token}`,
          'projectid': localStorage.proj_id
        }
      })
      .then((response) => {
        this.stages = response.data
        console.log(this.stages)
      })
    },

    getEmpl() {
      axios
      .get('/api/organization/getMembers', {
        headers: {
          'authorization': `Bearer ${localStorage.access_token}`,
          'organizationId': localStorage.org_id
        }
      })
      .then((response) => {
        this.employees = response.data
        console.log(this.employees)
      })
    },

    showStages() {
      this.currentTab = 'stage';
    },

    showEmployees() {
      this.currentTab = 'employees';
    },

    showLeaders() {
      this.currentTab = 'leaders';
    },

    showCalendar() {
      this.currentTab = 'calendar';
    },

    showChat() {
      this.currentTab = 'chat';
    },
  }
}
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
body{
  font-family: 'Poppins';
}
.text-primary {
  color: lightpink ;
}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
 
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
  font-size: .7875rem !important;
}
h3, .h3 {
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
a {
  color: #4650dd;
  text-decoration: underline;
  cursor: pointer;
}
.card-profile-img {
  position: relative;
  max-width: 8rem;
  margin-top: -6rem;
  margin-bottom: 1rem;
  border: 3px solid #fff;
  border-radius: 100%;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 2;
}
img, svg {
  vertical-align: middle;
}
.avatar.avatar-lg {
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
}
.avatar {
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
  text-align: center;
  border: #dee2e6;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  line-height: 3rem;
}
.form-control
{
  color: #343a40;
}
.page-heading {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
}

.card-profile .card-header {
  height: 9rem;
  background-position: center center;
  background-size: cover;
}
.form-label-org{
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

.mb-3{
  margin: 15px;
}
.btn-proj{
  background-color: #fff !important;
  border: none!important;
  margin-left: 40px!important;
  margin-right: 40px!important;
  margin-top: 0;
  color: black !important;
  font-size: 18px !important; 
}
.title-list{
  display: flex; 
  justify-content: center;
  padding: 0 !important;
  
}
.part-name{
  display: flex; 
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 25px;
}
.inf-proj{
  display: flex; 
  justify-content: center;
}
</style>