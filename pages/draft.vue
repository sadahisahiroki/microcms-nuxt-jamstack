<template>
  <div v-if="data">
    <h1 class="title">{{ data.title }}</h1>
    <p class="publishedAt">{{ data.updatedAt }}</p>
    <p class="category" v-if=" data.category !== null ">{{ data.category }}</p>
    <div class="post" v-html="data.body"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: {
        category: {
          name: this.name || ''
        }
      }
    }
  },
  async created() {
    const query = this.$route.query;
    if( query.id === undefined || query.draftKey === undefined ) {
      return;
    }
    const { data } = await axios.get(
      `/.netlify/functions/draft?id=${query.id}&draftKey=${query.draftKey}`);
    this.data = data;
  },
};
</script>

<style scoped lang="scss">
.publishedAt {
  margin-bottom: 0;
}
.category {
  margin-bottom: 1rem;
}
.post {
  > h1 {
    font-size: 3.6rem;  
  }
  > h2 {
    font-size: 2.4rem;  
  }
  > h3 {
    font-size: 1.8rem;  
  }
  > h4 {
    font-size: 1.6rem;  
  }
}
</style>