<template>
  <div class="list-proj">
    <ul>
      <OrgProjectsItem v-for="project in projects" :key="project.id" :project="project" />
    </ul>
  </div>
</template>

<script>
import OrgProjectsItem from './OrgProjectsItem.vue';

export default {
  components: {
    OrgProjectsItem
  },
  props: ['projects']
};
</script>

<style>
ul {
  margin-left: 0;
  padding-left: 0 !important;
}
</style>