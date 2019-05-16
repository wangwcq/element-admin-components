<template>
  <router-view/>
</template>

<script>
export default {
  name: 'app',
  metaInfo() {
    return {
      title: '',
      titleTemplate: title => `${title && `${title} - `}${this.appTitle || 'MioTech Internal Systems'}`,
    };
  },
  computed: {
    appTitle() {
      const ret = _.get(_.find(this.$route.matched, x => x.meta.appTitle) || {}, 'meta.appTitle');
      return ret;
    },
  },
};
</script>

<style lang="less">
  body {
    margin: 0;
    padding: 0;
    font-family: Roboto, Arial;
  }
  .container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .m-b, .mb {
    margin-bottom: 10px;
  }
  .ml {
    margin-left: 10px;
  }
  .mr {
    margin-right: 10px;
  }
  .p0 {
    padding: 0;
  }
  .text-smaller {
    font-size: 12px;
    color: #999;
  }
  .el-button {
    & + .el-button {
      margin-left: 10px;
    }
    & + .el-dropdown {
      margin-left: 10px;
    }
  }
  .subnav {
    &__container {
      flex: 0 0 120px;
      padding: 0 12px;
    }
  }
  .flex {
    flex: 1 1 auto;
  }
  .flex-row-justify {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .loading-placeholder {
    min-height: 150px;
  }
  .h100p {
    height: 100%;
  }
  .section-title {
    margin: 30px 0 12px 0;
    border-bottom: solid 1px #ccc;
    padding-bottom: 8px;
    h1 {
      margin: 0;
    }
    &.is-first {
      margin-top: 0;
    }
  }
  pre {
    padding: 0;
    margin: 0;
    word-break: break-all;
    white-space: pre-wrap;
  }
  .el-row--flex {
    flex-wrap: wrap;
  }
  .relative {
    position: relative;
  }
</style>
