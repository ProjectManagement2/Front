<template>
    <div v-if="localIsVisible">
        <div id="delete" class="w-75 mx-auto border p-3 rounded">
            <b-form @submit.prevent="deleteProject">
                <h3 class="name-form">Удаление проекта</h3>
                <div class="row form-group">
                    <label>Выберете проект:</label>
                    <select class="select-deleteproject" v-model="form.ProjectId" @change="selectProject">
                        <option v-for="project in projects" :key="project._id" :value="project._id">
                        {{ project.name }}
                        </option>
                    </select>
                </div>
                <b-button variant="primary" class="btn-delete-deleteproject" type="submit">Удалить</b-button>
                <b-button variant="primary" class="btn-close-deleteproject" @click="closeForm">Закрыть</b-button>
            </b-form>
        </div>
        <div class="overlay" @click="closeForm"></div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            projects: [],
            form: { ProjectId: "" },
        };
    },
    mounted() {
        this.getProjects();
    },
    methods: {
        getProjects() {
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
            })
            .catch((error) => {
            this.handleError(error);
            });
        },
        selectProject() {
        console.log('Выбран проект с ID:', this.form.ProjectId);
        },
        deleteProject() {
            if (this.form.ProjectId) {
                axios
                    .delete("/api/organization/deleteProject", {
                        headers: {
                            authorization: `Bearer ${localStorage.access_token}`,
                            projectid: this.form.ProjectId,
                            organizationId: localStorage.org_id,
                        },
                    })
                    .then(() => {
                        window.location.reload();
                        this.$toast.success("Проект удален", {
                            position: "top-right",
                            timeout: 7000,
                            closeOnClick: true,
                            pauseOnFocusLoss: true,
                            pauseOnHover: true,
                            draggable: true,
                            draggablePercent: 0.6,
                            showCloseButtonOnHover: false,
                            hideProgressBar: true,
                            closeButton: "button",
                            icon: true,
                            rtl: false,
                        });
                    })
                    .catch((error) => {
                        this.handleError(error);
                    });
            } else {
                this.$toast.error("Проект не выбран", {
                    position: "top-right",
                    timeout: 7000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false,
                });
            }
        },
        handleError(error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                this.$toast.error(error.response.data.message, {
                    position: "top-right",
                    timeout: 7000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false,
                });
            } else {
                this.$toast.error("Неизвестная ошибка");
            }
        },
        closeForm() {
            this.$emit("close");
        },
    },
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        localIsVisible() {
            return this.isVisible;
        },
    },
};
</script>

<style scoped>
#delete {
    left: 50%;
    top: -550px;
    background-color: white;
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 13px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    z-index: 1000;
    /* Позиция по z-index - поверх всего остального контента */
    transition: transform 0.3s ease;
    /* Анимация для открытия/закрытия меню */
    transform: translateX(-100%);
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Прозрачный чёрный цвет */
    z-index: 999;
    /* Позиция по z-index - под боковым меню, но поверх остального контента */
}

.name-form {
    font-size: 18px;
    margin-left: 15px;
    margin-bottom: 15px;
}

.btn-delete-deleteproject,
.btn-close-deleteproject {
    font-size: 15px;
    color: rgb(67, 67, 67) !important;
    background-color: rgb(168, 205, 234) !important;
    border-color: rgb(168, 205, 234) !important;
    margin-top: 15px;
    margin-left: 15px;
}

.form-group,
.row.form-group,
.mt-3 {
    margin-left: 5px;
    margin-top: 5px;
    margin-right: 5px;
}

.select-deleteproject {
    margin-left: 10px;
    margin-right: 15px;
    margin-bottom: 15px;
    border-color: rgb(199, 199, 199);
    border-radius: 5px;
    height: 30px;
    width: 500px;
}
</style>
