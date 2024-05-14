<template>
    <div>
        <div class="stg-elem">
            <div class="stage-inf">
                <h6 class="stg-name">Этап: {{ stage.name }}</h6>
                <h6 class="stg-descr">Описание: {{ stage.description }}</h6>
            </div>
            <div class="stage-buttons">
                <b-button variant="primary" class="btn-create-task" @click="showAddTask">Добавить задачу</b-button>
                <button class="btn-open-stage" @click="showTasks">
                    <img src="@/assets/arrow-icon.png" alt="Показать задачи">
                </button>
            </div>
            
        </div>
        <div>
            <TasksList :tasks="tasks" :is-visible="isTasksVisible" />
            <AddTask :is-visible="isAddTaskVisible" @close="closeAddTask" />
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
            tasks: []
        }  
    },
    mounted() {
        this.getStageId();
        
    },
    methods: {
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
                'stageid': localStorage.stage_id
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
    size: 90%;
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
    
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: lightpink !important;
    border-color: lightpink !important;
    
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