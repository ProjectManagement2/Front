<template>
  <div>
    <AddStage :is-visible="isAddStageVisible" @close="closeAddStage" />
    <div class="stg-row">
      <div class="stages-new">
        <h5 class="stg-title">Этапы</h5>
        <div class="stg-buttons">
          <button v-if="access === true" class="btn-create-stage" @click="showAddStage">
            <img src="@/assets/add-icon.png" alt="Показать задачи">
          </button>
          <button v-if="access === true" class="btn-create-stage" @click="showAddStage">
            <img src="@/assets/edit-icon.png" alt="Показать задачи">
          </button>
          <button v-if="access === true" class="btn-create-stage" @click="showAddStage">
            <img src="@/assets/delete-icon.png" alt="Показать задачи">
          </button>
        </div>
        
      </div>
      <div class="stages-list">
        <StagesItem v-for="stage in stages" :key="stage.id" :stage="stage" />
      </div>
    </div>
  </div>
</template>

<script>
import AddStage from '../modal_forms/AddStage.vue';
import StagesItem from './StagesItem.vue';
import axios from 'axios';

export default {
  components: {
    StagesItem,
    AddStage
  },
  data() {
    return {
      isAddStageVisible: false,
      access: null
    }
  },
  props: ['stages'],
  mounted() {
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
    showAddStage() {
      this.isAddStageVisible = true;
    },
    closeAddStage() {
      this.isAddStageVisible = false;
    }
  }
};
</script>

<style>
.stages-new {
  margin-top: 50px !important;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;

}

.stg-title {
  margin-left: 45% !important;
  margin-top: 1%;
}

.btn-create-stage {
  color: rgb(67, 67, 67) !important;
  margin-bottom: 0.5%;
  margin-top: 1%;
  margin-left: 10px;
  margin-right: 15px;
  padding-right: 3px;
  padding-left: 3px;
  background-color: rgb(168, 205, 234) !important;
  border-color: rgb(168, 205, 234) !important;
  border-radius: 8px;
}
.btn-create-stage img {
  width: 25px;
  height: auto;
}
.stages-list {
  padding: 0px !important;

}
</style>