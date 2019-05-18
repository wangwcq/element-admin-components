<template>
  <div>
    <page-title />
    <model-view
        v-bind="props"
    />
  </div>
</template>

<script>
  export default {
    name: "ModelViewView",
    data() {
      return {
        props: {
          model: {
            id: 1,
            title: '文章标题',
            type: 'article',
            category: 20,
            content: '<em>HTML</em>',
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