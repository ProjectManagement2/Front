<template>
  <div class="page-holder">
    <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
      <div class="page-header mb-2">
        <h1 class="page-heading">Об организации</h1>
      </div>
      <section>
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <div class="card-header">
                <h4 class="card-heading">{{ posts.name }}</h4>
              </div>
              <p class="mb-3">Ответственный за организацию:</p>
              <p class="mb-3">
                {{ posts.leader.surname }} {{ posts.leader.name }}
                {{ posts.leader.otch }}
              </p>
              <p class="mb-3">Описание: {{ posts.description }}</p>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="row">
              <div class="title-list">
                <b-button variant="primary" class="btn-org" @click="showProjects">Проекты</b-button>
                <b-button variant="primary" class="btn-org" @click="showEmployees">Участники</b-button>
                <b-button variant="primary" class="btn-org" @click="showLeaders">Лидеры организации</b-button>
              </div>
              <div v-if="currentTab === 'projects'">
                <h4 class="part-name">Список дейтсвующих проектов</h4>
                <div class="col">
                  <div class="inf-org">
                    <OrgProjectsList :projects="projects" />
                  </div>
                  <div class="inf-org">
                    <b-button v-if="access === true" variant="primary" class="btn-create-proj"
                      @click="createProject">Создать проект</b-button>
                    <b-button v-if="access === true" variant="primary" class="btn-change-proj">Редактировать
                      проект</b-button>
                  </div>
                </div>
              </div>
              <div v-else-if="currentTab === 'employees'">
                <h4 class="part-name">Список сотрудников</h4>
                <div class="col">
                  <div class="inf-org">
                    <ul>
                      <li v-for="employee in employees" :key="employee.id">
                        {{ employee.surname }} {{ employee.name }}
                        {{ employee.otch }}
                      </li>
                    </ul>
                  </div>
                  <div class="inf-org">
                    <b-button v-if="access === true" variant="primary" class="btn-create-proj"
                      @click="showAddEmpl">Добавить
                      сотрудника</b-button>
                  </div>
                  <AddEmplOrg :is-visible="isAddEmplVisible" @close="closeAddEmpl" />
                </div>
              </div>
              <div v-else-if="currentTab === 'leaders'">
                <h4 class="part-name">Список лидеров организации</h4>
                <div class="col">
                  <div class="inf-org">
                    <p class="mb-3">
                      {{ posts.leader.surname }} {{ posts.leader.name }}
                      {{ posts.leader.otch }}
                    </p>
                  </div>
                  <div class="inf-org">
                    <b-button v-if="access === true" variant="primary" class="btn-create-proj">Добавить
                      лидера</b-button>
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
import OrgProjectsList from "./additional_comp/OrgProjectsList.vue";
import AddEmplOrg from "./modal_forms/AddEmplOrg.vue";

export default {
  name: "PageOrg",
  components: {
    OrgProjectsList,
    AddEmplOrg
  },
  data() {
    return {
      isAddEmplVisible: false,
      currentTab: "projects",
      posts: [],
      projects: [],
      employees: [],
      access: null,
    };
  },

  mounted() {
    axios
      .get("/api/organization/mainInfo", {
        headers: {
          authorization: `Bearer ${localStorage.access_token}`,
          organizationId: localStorage.org_id,
        },
      })
      .then((response) => {
        this.posts = response.data;
        console.log(this.posts);
      }),
      this.getProjs(),
      this.getEmpl(),
      this.getUserAccess();
  },

  methods: {
    getUserAccess() {
      axios
        .get("/api/access/checkOrgLeader", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            organizationId: localStorage.org_id,
          },
        })
        .then((response) => {
          this.access = response.data.access;
          console.log(this.access);
        });
    },
    getEmpl() {
      axios
        .get("/api/organization/getMembers", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            organizationId: localStorage.org_id,
          },
        })
        .then((response) => {
          this.employees = response.data;
          console.log(this.employees);
        });
    },

    getProjs() {
      axios
        .get("/api/organization/getProjects", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            organizationId: localStorage.org_id,
          },
        })
        .then((response) => {
          this.projects = response.data;
          console.log(this.projects);
        });
    },

    createProject() {
      router.push("/project/create");
    },

    showProjects() {
      this.currentTab = "projects";
    },

    showEmployees() {
      this.currentTab = "employees";
    },

    showLeaders() {
      this.currentTab = "leaders";
    },
    showAddEmpl() {
      this.isAddEmplVisible = true;
    },
    closeAddEmpl() {
      this.isAddEmplVisible = false;
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
  padding: 2%;
  border-bottom: none;
  background-color: rgba(168, 205, 234, 0.323) !important;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  z-index: 2;
}

.card-heading {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
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
  padding-top: 20px;
  padding-bottom: 20px;
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

.btn-create-proj,
.btn-change-proj {
  background-color: rgb(168, 205, 234) !important;
  border-color: rgb(168, 205, 234) !important;
  margin-left: 15px !important;
  margin-right: 15px !important;
  margin-top: 15px !important;
  margin-bottom: 15px;
  color: rgb(67, 67, 67) !important;
}

.btn-org {
  background-color: #fff !important;
  border: none !important;
  margin-left: 50px !important;
  margin-right: 50px !important;
  margin-top: 0;
  color: black !important;
  font-size: 18px !important;
  font-weight: 600;
}

.mb-3 {
  margin-top: 15px;
  margin-left: 17px;
}

.title-list {
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
  padding-top: 8px;
  padding-left: 0 !important;
  padding-right: 0 !important;
  border-radius: 20px;
  border-top: none;
  border-left: none;
  border-right: none;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.07);
}

.part-name {
  display: flex;
  justify-content: center;
  margin-top: 35px !important;
  margin-bottom: 35px !important;
}

.inf-org {
  display: flex;
  justify-content: center;
}
</style>
