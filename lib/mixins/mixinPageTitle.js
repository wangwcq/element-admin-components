export default {
  computed: {
    breadcrumbs() {
      const ret = _.map(this.$route.matched, (x) => {
        let { path } = x;
        _.forEach(this.$route.params, (v, k) => {
          path = path.replace(`:${k}`, v);
        });
        return ({
          to: path,
          title: x.meta.title || '',
        });
      }).filter(x => x.title);
      ret.splice(0, 1);
      return ret;
    },
    vTitle() {
      let title = this.title || '';
      if (!title) {
        ({ title } = _.last(this.breadcrumbs) || {});
      }
      if (!title) {
        title = 'MioTech Internal Systems';
      }
      return title;
    },
  },
  metaInfo() {
    return {
      title: this.vTitle || '',
    };
  },
};
