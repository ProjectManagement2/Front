<template>
    <div>
        <AddTask :is-visible="isAddTaskVisible" @close="closeAddTask" :stageId="stage._id"></AddTask>
        <DeleteTask :is-visible="isDeleteTaskVisible" @close="closeDeleteTask" :stageId="stage._id"></DeleteTask> 
        <EditTask :is-visible="isEditTaskVisible" @close="closeEditTask" :stageId="stage._id"></EditTask>
        <div class="stg-elem">
            <div class="stage-inf">
                <div class="row">
                    <div class="col">
                        <h6 class="stg-name">{{ stage.name }}</h6>
                        <h6 class="stg-descr">Описание: {{ stage.description }}</h6>
                    </div>
                    <div class="col">
                        <h6 class="stg-name">Начало: {{ formatDate(stage.startDate) }}</h6>
                        <h6 class="stg-descr">Конец: {{ formatDate(stage.endDate) }}</h6>
                    </div>
                </div>
            </div>
            <div class="stage-buttons">
                <button v-if="access === true" class="btn-create-task" @click="showAddTask">
                    <img src="@/assets/add-icon.png" alt="Показать задачи">
                </button>
                <button v-if="access === true" class="btn-create-task" @click="showEditTask">
                    <img src="@/assets/edit-icon.png" alt="Показать задачи">
                </button>
                <button v-if="access === true" class="btn-create-task" @click="showDeleteTask">
                    <img src="@/assets/delete-icon.png" alt="Показать задачи">
                </button>
                <button class="btn-open-stage" @click="showTasks">
                    <img src="@/assets/arrow-icon.png" alt="Показать задачи">
                </button>
            </div>
        </div>
        <div class="tasks-list">
            <TasksList :tasks="tasks" :is-visible="isTasksVisible" />
        </div>
        
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import AddTask from "../modal_forms/AddTask.vue";
import EditTask from "../modal_forms/EditTask.vue";
import DeleteTask from "../modal_forms/DeleteTask.vue";
import TasksList from "./TasksList.vue";
export default {
    props: ['stage'],
    components: {
        AddTask,
        EditTask,
        DeleteTask,
        TasksList
    },
    data() {
        return {
            isDeleteTaskVisible: false,
            isEditTaskVisible: false,
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
        formatDate(dateString) {
            const dateObject = new Date(dateString);
            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const year = dateObject.getFullYear();
            return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month
                }.${year}`;
        },
        showAddTask() {
            this.isAddTaskVisible = true;
        },
        closeAddTask() {
            this.isAddTaskVisible = false;
        },
        showEditTask() {
            this.isEditTaskVisible = true;
        },
        closeEditTask() {
            this.isEditTaskVisible = false;
        },
        showDeleteTask() {
            this.isDeleteTaskVisible = true;
        },
        closeDeleteTask() {
            this.isDeleteTaskVisible = false;
        },
        showTasks() {
            this.isTasksVisible = !this.isTasksVisible;
            if (this.isTasksVisible) {
                this.getTasks();
            }
        },
        getStageId() {
            localStorage.stage_id = this.stage._id;
        },
        getTasks() {
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
.stg-elem {
    border: 1px solid rgb(227, 227, 227);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    background-color: white;

}
.stage-blocked{
    border: 1px solid rgb(227, 227, 227);
    border-radius: 10px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(221, 221, 221);
}
.tasks-list {
    display: flex;
    justify-content: center;
    padding-top: 2%;
    border: 1px solid rgb(216, 216, 216);
    border-radius: 0 0 10px 10px;
    border-width: 0 1px 1px 1px;
}

.stage-buttons {
    display: flex;
}

.stg-name {
    margin-top: 10px;
    margin-left: 15px;
    margin-bottom: 10px;
}

.stg-descr {
    margin-left: 15px;
    margin-bottom: 10px;
}

.btn-create-task {
    display: flex;
    color: rgb(67, 67, 67) !important;
    height: 30px;
    margin-top: 8%;
    margin-left: 10px;
    margin-right: 15px;
    padding-right: 3px;
    padding-left: 3px;
    padding-bottom: 3px !important;
    padding-top: 3px;
    background-color: rgb(168, 205, 234) !important;
    border-color: rgb(168, 205, 234) !important;
    border-radius: 8px;
}

.btn-open-stage {
    background-color: transparent;
    border: none;

    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
}

.btn-open-stage img {
    width: 30px;
    height: auto;
}
.btn-create-task img {
  width: 25px;
  height: auto;
}

</style>