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
            cover: 'https://picsum.photos/200',
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
              link: false,
            },
            {
              name: 'content',
              title: this.$t('moduleModelForm.fields.content'),
              type: 'htmleditor',
            },
            {
              name: 'cover',
              title: this.$t('moduleModelForm.fields.cover'),
              type: 'thumbnail',
            },
          ],
        },
      };
    },
  }
</script>

<style scoped>

</style>