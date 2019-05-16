<template>
  <div v-loading="loading">
    <router-link
        :to="`/admin/${this.model}/view/${data.id}`"
    >
      {{data[fieldTitle]}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ReferenceSelect',
  props: {
    api: {},
    model: {},
    value: {},
    fieldValue: { type: String, default: 'id' },
    fieldTitle: { type: String, default: 'title' },
  },
  emit: ['input'],
  data() {
    return {
      vApi: this.api || `/api/admin/open-api/${this.model}/view`,
      loading: false,
      data: {},
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        let data = await this.$axios.get(`${this.vApi}/${this.value}`);
        ({ data } = data);
        if (data.code === 0) {
          ({ data } = data);
        } else {
          throw new Error();
        }
        this.data = data;
      } catch (e) {
        this.data = {};
      }
      this.loading = false;
    },
  },
};
</script>
