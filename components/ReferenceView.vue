<template>
  <div v-loading="loading">
    <router-link
        v-if="doLinkToEntities"
        :to="`/admin/${this.model}/view/${data.id}`"
    >
      {{data[fieldTitle]}}
    </router-link>
    <template v-else>
      {{data[fieldTitle]}}
    </template>
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
    doLinkToEntities: { type: Boolean, default: true },
  },
  emit: ['input'],
  data() {
    return {
      vApi: this.api || `${this.$ctx.apiBase}/${this.model}/view`,
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
        console.error(`Retrieve reference value error with model ${this.model}`, e);
        this.data = {};
      }
      this.loading = false;
    },
  },
};
</script>
