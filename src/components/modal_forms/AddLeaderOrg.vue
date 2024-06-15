<template>
    <div v-if="localIsVisible">
        <div id="add" class="w-75 mx-auto border p-3 rounded">
            <b-form @submit.prevent="addEmpl">
                <div class="row form-group">
                    <label>Выберете сотрудника:</label>
                    <select v-model="form.newMemberId" @change="selectUser">
                        <option v-for="user in users" :key="user._id" :value="user._id">
                            {{ user.surname }} {{ user.name }} {{ user.otch }}
                        </option>
                    </select>
                </div>
                <b-button variant="primary" class="btn-add-addtask" type="submit">Добавить</b-button>
                <b-button variant="primary" class="btn-close-addtask" @click="closeForm">Закрыть</b-button>
            </b-form>
        </div>
        <div class="overlay" @click="closeForm"></div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: [],
            form:{ newMemberId: '' }
            
        };
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        getUsers() {
            axios
                .get('/api/organization/allUsers', {
                    headers: {
                        'authorization': `Bearer ${localStorage.access_token}`,
                        'organizationId': localStorage.org_id
                    }
                })
                .then((response) => {
                    this.users = response.data
                })
                .catch((error) => {
                    this.handleError(error);
                });
        },

        selectUser() {
            console.log('Выбран пользователь с ID:', this.form.newMemberId);
        },

        addEmpl() {
            let data = {
                newMemberId: this.form.newMemberId
            };
            if (this.form.newMemberId) {
                axios
                    .post("/api/organization/addUser", data, {
                        headers: {
                            'authorization': `Bearer ${localStorage.access_token}`,
                            'organizationId': localStorage.org_id
                        }
                    })
                    .then(() => {
                        window.location.reload();
                        this.$toast.success("Новый лидер добавлен", {
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
                        rtl: false
                        });
                    })
                    .catch((error) => {
                        this.handleError(error);
                    });
            } else {
                this.$toast.error('Лидер не выбран', {
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
                    rtl: false
                });
            }
        },
        handleError(error) {
            if (error.response && error.response.data && error.response.data.message) {
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
                rtl: false
            });
            } else {
                this.$toast.error('Неизвестная ошибка');
            }
        },
        closeForm() {
            this.$emit('close');
        }

    },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        stageId: {
            type: String,
            required: true
        }
    },
    computed: {
        localIsVisible() {
            return this.isVisible;
        }
    }
};
</script>

<style scoped>
#add {
    left: 50%;
    top: -300px;
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
    margin: 5px;
    margin-bottom: 15px;
}

.btn-add-addtask,
.btn-close-addtask {
    font-size: 15px;
    color: rgb(67, 67, 67) !important;
    background-color: rgb(168, 205, 234) !important;
    border-color: rgb(168, 205, 234) !important;
}

.form-group,
.row.form-group,
.mt-3 {
    margin-left: 5px;
    margin-top: 5px;
    margin-right: 5px;
}

#name,
#description,
#deadline,
#checkbox,
#tags,
#file {
    margin-bottom: 5px;
    font-size: 13px;
}
</style>