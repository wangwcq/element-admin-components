<template>
  <div>
    <page-title />
    <model-form
        v-bind="props"
    />
  </div>
</template>

<script>
  export default {
    name: "ModelFormView",
    data() {
      return {
        props: {
          model: {
            id: 1,
            title: '',
            type: 'article',
            category: 20,
          },
          fields: [
            {
              name: 'title',
              title: this.$t('moduleModelForm.fields.title')
            },
            {
              name: 'type',
              title: this.$t('moduleModelForm.fields.type'),
              type: 'select',
              options: {
                article: this.$t('moduleModelForm.fields.typeOptions.article'),
                file: this.$t('moduleModelForm.fields.typeOptions.file'),
              },
            },
            {
              name: 'category',
              title: this.$t('moduleModelForm.fields.category'),
              type: 'reference',
              reference: 'categories',
              filterable: false,
            },
            {
              name: 'content',
              title: this.$t('moduleModelForm.fields.content'),
              type: 'htmleditor',
            },
          ],
        },
      };
    },
  }
</script>

<style scoped>

</style>