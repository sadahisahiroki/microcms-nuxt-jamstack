<template>
  <main class="main">
    <h1 class="title">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <div class="post" v-html="body"></div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://jam-jam2-1.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers: { "X-API-KEY": "865c366d-79c3-4727-b68f-a6f22ee0876a" },
      }
    );
    return data;
  },
};
</script>

<style scoped lang="scss">
.main {
  max-width: 960px;
  margin: 0 auto;
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