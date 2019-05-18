<template>
  <div>
    <page-title />
    <api-table v-bind="props" />
  </div>
</template>

<script>
  export default {
    name: "ApiTableView",
    data() {
      return {
        props: {
          api: '/api/admin/api-table',
          columns: [
            {
              name: '_id',
              type: 'hidden',
            },
            {
              name: 'createdAt',
              title: this.$t('moduleApiTable.columns.time'),
              type: 'date',
            },
            {
              name: 'token',
              title: this.$t('moduleApiTable.columns.token'),
            },
            {
              name: 'ip',
              title: this.$t('moduleApiTable.columns.ip'),
            },
            {
              name: 'scene',
              title: this.$t('moduleApiTable.columns.scene'),
              type: 'tag',
            },
            {
              name: 'contact',
              title: this.$t('moduleApiTable.columns.contact'),
              type: 'pre',
              className: 'normal',
              getData(row) {
                return [
                  [
                    _.get(row, 'request[0].firstName'),
                    _.get(row, 'request[0].lastName'),
                  ].filter(Boolean).join(' '),
                  _.get(row, 'request[0].email'),
                  [
                    _.get(row, 'request[0].companyName'),
                    _.get(row, 'request[0].role'),
                  ].filter(Boolean).join(' - '),
                ].join('\n');
              },
            },
          ],
        },
      };
    },
  }
</script>

<style scoped>

</style>