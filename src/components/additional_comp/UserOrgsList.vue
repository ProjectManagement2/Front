<template>
  <div class="list-org">
    <ul>
      <UserOrgsItem v-for="organization in organizations" :key="organization.id" :organization="organization" />
    </ul>
  </div>
</template>

<script>
import UserOrgsItem from './UserOrgsItem.vue';

export default {
  components: {
    UserOrgsItem
  },
  props: ['organizations']
};
</script>

<style>
.list-org {
  margin-top: 15px;
}

ul {
  margin-left: 0;
  padding-left: 0;
}
</style>