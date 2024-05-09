<template>
    <div class="row">
        <div class="stages-new">
            <h5 class="stg-title">Этапы</h5>
            <b-button variant="primary"class="btn-create-stage" @click="showAddStage">Добавить этап</b-button>
        </div>
        <div class="newstage-form">
          <AddStage :is-visible="isAddStageVisible" @close="closeAddStage" />
        </div>
        <div class="stages-list">
          <StagesItem v-for="stage in stages" :key="stage.id" :stage="stage" />
        </div>
    </div>
</template>

<script>
  import AddStage from '../modal_forms/AddStage.vue';
  import StagesItem from './StagesItem.vue';
  
  export default {
    components: {
      StagesItem,
      AddStage
    },
    data(){
      return{
        isAddStageVisible: false,
      }
    },
    props: ['stages'],
    methods:{
      showAddStage(){
        this.isAddStageVisible = true;
      },
      closeAddStage(){
        this.isAddStageVisible = false;
      }
    }
  };
</script>

<style>
.newstage-form{
  display: flex;
  justify-content: center;
}
.stages-new{
  margin-top: 50px !important;
  margin-bottom: 30px;
  display: flex;
  border: 1px solid rgb(158, 158, 158);
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;

}
.stg-title{
  margin-left: 45% !important;
  margin-top: 1%;
}
.btn-create-stage{
  left: 30%;
  margin-bottom: 0.5%;
  margin-top: 0.5%;
  background-color: lightpink !important;
  border-color: lightpink !important;
}
.stages-list{
  padding: 0px !important;
  
}
</style>