<template>
<div>
  <ul>
    <li v-for="content in contents" :key="content.id">
      <nuxt-link :to="`/${content.id}`">
        {{ content.title }}
        <span v-if=" content.category !== null ">
          {{ content.category.name }}
        </span>
      </nuxt-link>
    </li>
  </ul>
  <ul v-show="contents.length > 0" class="pager">
    <li
      v-for="p in pager"
      :key="p"
      class="page"
      :class="{ active: page === `${p + 1}` }"
    >
      <nuxt-link
        :to="`/${
          selectedCategory !== undefined
            ? `category/${selectedCategory.id}/`
            : ''
        }page/${p + 1}`"
      >
        {{ p + 1 }}
      </nuxt-link>
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData({ params }) {
    const page = params.p || '1';
    const categoryId = params.categoryId;
    const limit = 3;

    const { data } = await axios.get(
      `https://jam-jam2-1.microcms.io/api/v1/blog?=limit=${limit}${
        categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
      {
        headers: { "X-API-KEY": "865c366d-79c3-4727-b68f-a6f22ee0876a" },
      }
    );
    const categories = await axios.get(
      `https://jam-jam2-1.microcms.io/api/v1/categories?limit=100`,
      {
        headers: { "X-API-KEY": "865c366d-79c3-4727-b68f-a6f22ee0876a" },
      }
    );
    const selectedCategory =
          categoryId !== undefined
            ? categories.data.contents.find((content) => content.id === categoryId)
            : undefined;
    return {
      ...data,
      selectedCategory,
      pager: [...Array(Math.ceil(data.totalCount / limit)).keys()],
    };
  },
  data() {
    return {
      contents: this.contents || [],
      totalCount: this.totalCount || 0,
      pager: this.pager || [],
    };
  },};
</script>
