<template>
    <div>
        <AddTask :is-visible="isAddTaskVisible" @close="closeAddTask" :stageId="stage._id" />
        <div class="stg-elem">
            <div class="stage-inf">
                <h6 class="stg-name">Этап: {{ stage.name }}</h6>
                <h6 class="stg-descr">Описание: {{ stage.description }}</h6>
            </div>
            <div class="stage-buttons">
                <b-button v-if="access === true" variant="primary" class="btn-create-task" @click="showAddTask">Добавить задачу</b-button>
                <button class="btn-open-stage" @click="showTasks">
                    <img src="@/assets/arrow-icon.png" alt="Показать задачи">
                </button>
            </div>
            
        </div>
        <div>
            <TasksList :tasks="tasks" :is-visible="isTasksVisible" />
            
        </div>
    </div>
    
</template>

<script> 
 import "bootstrap/dist/css/bootstrap.min.css";
 import axios from 'axios';
 import AddTask from "../modal_forms/AddTask.vue";
 import TasksList from "./TasksList.vue";
  export default {
    props: ['stage'],
    components: {
        AddTask,
        TasksList
    },
    data() {
        return {
            isAddTaskVisible: false,
            isTasksVisible: false,
            tasks: [],
            access: null
        }  
    },
    mounted() {
        this.getStageId();
        this.getUserAccess();
    },
    methods: {
        getUserAccess() {
            axios
            .get('/api/access/checkProjectLeader', {
                headers: {
                'authorization': `Bearer ${localStorage.access_token}`,
                'projectid': localStorage.proj_id
                }
            })
            .then((response) => {
                this.access = response.data.access
                console.log(this.access)
            })
        },
        showAddTask() {
            this.isAddTaskVisible = true;
        },
        closeAddTask() {
            this.isAddTaskVisible = false;
        },
        showTasks(){
            this.isTasksVisible = true;
            if (this.isTasksVisible) {
                this.getTasks();
            }
        },
        getStageId() {
            localStorage.stage_id = this.stage._id;
        },
        getTasks(){
            axios
            .get('/api/project/getAllTasks', {
                headers: {
                'authorization': `Bearer ${localStorage.access_token}`,
                'stageid': this.stage._id
                }
            })
            .then((response) => {
                this.tasks = response.data
            });
        },
    }
  };
</script>

<style>
.stg-elem{
    border: 1px solid rgb(227, 227, 227);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    
    background-color: white;
    
}
.stage-buttons{
    display: flex;
}
.stg-name{
    margin-top: 10px;
    margin-left: 15px;
    margin-bottom: 10px;
}
.stg-descr{
    margin-left: 15px;
    margin-bottom: 10px;
}
.btn-create-task{
    display: flex;
    color: rgb(67, 67, 67)!important;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: rgb(168, 205, 234) !important;
    border-color: rgb(168, 205, 234) !important;
    
}
.btn-open-stage{
    background-color: transparent;
    border: none;
    
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
}
.btn-open-stage img {
    width: 35px; /* Размер иконки меню */
    height: auto;
  }
</style>