<template>
    <div>
        <div class="stg-elem">
            <div class="stage-inf">
                <h6 class="stg-name">Этап: {{ stage.name }}</h6>
                <h6 class="stg-descr">Описание: {{ stage.description }}</h6>
            </div>
            <b-button variant="primary" class="btn-create-task" @click="showAddTask">Добавить задачу</b-button>
            <b-button variant="primary" class="btn-open-stage">⤵</b-button>
        </div>
        <div>
            <AddTask :is-visible="isAddTaskVisible" @close="closeAddTask" />
        </div>
    </div>
    
</template>

<script> 
 import "bootstrap/dist/css/bootstrap.min.css";
 import AddTask from "../modal_forms/AddTask.vue";
  export default {
    props: ['stage'],
    components: {
        AddTask
    },
    data() {
        return {
            isAddTaskVisible: false,
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
.btn-create-task, .btn-open-stage{
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: lightpink !important;
    border-color: lightpink !important;
    left: 29%;
}
</style>