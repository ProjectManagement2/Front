<template>
    <div v-if="localIsVisible">
        <div id="delete" class="w-75 mx-auto border p-3 rounded">
            <b-form @submit.prevent="deleteStage">
                <h3 class="name-form">Удаление этапа</h3>
                <div class="row form-group">
                    <label>Выберете этап:</label>
                    <select class="select-stage" v-model="form.StageId" @change="selectStage">
                        <option v-for="stage in stages" :key="stage._id" :value="stage._id">
                            {{ stage.name }}
                        </option>
                    </select>
                </div>
                <b-button variant="primary" class="btn-delete-deletestage" type="submit">Удалить</b-button>
                <b-button variant="primary" class="btn-close-deletestage" @click="closeForm">Закрыть</b-button>
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
            stages: [],
            form:{ StageId: '' }
            
        };
    },
    mounted() {
        this.getStages();
    },
    methods: {
        getStages() {
            axios
                .get('/api/project/getAllStages', {
                    headers: {
                        'authorization': `Bearer ${localStorage.access_token}`,
                        'projectid': localStorage.proj_id,
                    }
                })
                .then((response) => {
                    this.stages = response.data
                });
        },

        selectStage() {
            console.log('Выбран этап с ID:', this.form.StageId);
        },

        deleteStage() {
            if (this.form.StageId) {
                axios
                    .delete("/api/project/deleteStage", {
                        headers: {
                            'authorization': `Bearer ${localStorage.access_token}`,
                            'projectid': localStorage.proj_id,
                            'stageid': this.form.StageId
                        }
                    })
                    .then(() => {
                        console.log("Этап удален");
                        window.location.reload();
                    })
                    .catch((errors) => {
                        console.log(errors);
                    });
            } else {
                console.warn('Этап не выбран');
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
#delete {
    left: 50%;
    top: -150px;
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

.btn-delete-deletestage,
.btn-close-deletestage {
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

.select-stage {
  margin-left: 10px;
  margin-right: 15px;
  margin-bottom: 15px;
  border-color: rgb(199, 199, 199);
  border-radius: 5px;
  height: 30px;
  width: 500px;
}
</style>