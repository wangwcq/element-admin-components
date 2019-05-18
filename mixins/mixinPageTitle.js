export default {
  computed: {
    breadcrumbs() {
      const ret = _.map(this.$route.matched, (x) => {
        let { path } = x;
        _.forEach(this.$route.params, (v, k) => {
          path = path.replace(`:${k}`, v);
        });
        let title = x.meta.title;
        if (x.meta.titleKey) {
          title = this.$t(`views.${x.meta.titleKey}.title`);
        }
        return ({
          to: path,
          title,
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
        title = this.$ctx.appTitle;
        if (this.$ctx.appTitleKey) {
          title = this.$t(`app.${this.$ctx.appTitleKey}.title`);
        }
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
