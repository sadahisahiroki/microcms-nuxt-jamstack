<template>
  <ul>
    <li v-for="content in contents" :key="content.id">
      <nuxt-link :to="`/${content.id}`">
        {{ content.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData() {
    const { data } = await axios.get(
      "https://jam-jam2-1.microcms.io/api/v1/blog",
      {
        headers: { "X-API-KEY": "865c366d-79c3-4727-b68f-a6f22ee0876a" },
      }
    );
    return data;
  },
};
</script>
