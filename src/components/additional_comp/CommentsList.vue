<template>
    <div v-if="localIsVisible">
        <div v-for="(comment, index) in comments" :key="index" class="comments-inf">
            <span class="comment-text">{{ comment.text }} </span>
            <span class="comment-date">{{ formatDateforComments(comment.createdAt) }}</span>
        </div>
    </div>
    
</template>

<script>

export default {
  
props:
  {
    comments: Array,
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localIsVisible() {
      return this.isVisible;
    }
  },
  methods: {
    formatDateforComments(dateString) {
      const dateObject = new Date(dateString);
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1; // Месяцы в JS начинаются с 0
      const year = dateObject.getFullYear();
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year} ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    }
  }
};    
</script>

<style>
.comments-inf{
  display: flex;
  flex-direction: column;
}

.comment-date{
  margin-top: 4px;
  margin-bottom: 20px;
  font-size: 13px;
}
.comments-title{
  display: flex;
  flex-direction: row;
}
</style>