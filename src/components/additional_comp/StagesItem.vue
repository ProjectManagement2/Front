<template>
    <div>
        <div class="stg-elem">
            <div class="stage-inf">
                <h6 class="stg-name">Этап: {{ stage.name }}</h6>
                <h6 class="stg-descr">Описание: {{ stage.description }}</h6>
            </div>
            <b-button variant="primary" class="btn-create-task" @click="showAddTask">Добавить задачу</b-button>
            <button class="btn-open-stage" @click="showTasks">
                <img src="@/assets/arrow-icon.png" alt="Показать задачи">
            </button>
        </div>
        <div>
            <TasksInf :is-visible="isTasksVisible" @click="showTasks"/>
            <AddTask :is-visible="isAddTaskVisible" @close="closeAddTask" />
        </div>
    </div>
    
</template>

<script> 
 import "bootstrap/dist/css/bootstrap.min.css";
 import AddTask from "../modal_forms/AddTask.vue";
 import TasksInf from "./TasksInf.vue";
  export default {
    props: ['stage'],
    components: {
        AddTask,
        TasksInf
    },
    data() {
        return {
            isAddTaskVisible: false,
            isTasksVisible: false
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
            this.isTasksVisible = !this.isTasksVisible;
        },
        getStageId() {
            localStorage.stage_id = this.stage._id;
        }
    }
  };
</script>

<style>
.stg-elem{
    border: 1px solid rgb(184, 184, 184);
    border-radius: 10px;
    display: flex;
    size: 90%;
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
    left: 29%;
}
.btn-open-stage{
    background-color: transparent;
    border: none;
    left: 29%;
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
}
.btn-open-stage img {
    width: 35px; /* Размер иконки меню */
    height: auto;
  }
</style>