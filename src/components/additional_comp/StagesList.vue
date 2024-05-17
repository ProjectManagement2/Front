<template>
  <div>
    <AddStage :is-visible="isAddStageVisible" @close="closeAddStage" />
    <div class="stg-row">
      <div class="stages-new">
        <h5 class="stg-title">Этапы</h5>
        <b-button v-if="access === true" variant="primary" class="btn-create-stage" @click="showAddStage">Добавить
          этап</b-button>
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
  margin-top: 0.5%;
  background-color: rgb(168, 205, 234) !important;
  border-color: rgb(168, 205, 234) !important;
}

.stages-list {
  padding: 0px !important;

}
</style>