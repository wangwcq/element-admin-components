<template>
  <div class="page-title">
    <h1>
      <el-breadcrumb v-if="!noBreadcrumbs" class="page-title-breadcrumbs">
        <el-breadcrumb-item
          v-for="item in breadcrumbs"
          :key="item.to"
          :to="item.to"
        >
          {{ item.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div v-else>
        <el-link class="mb" icon="el-icon-arrow-left" @click="$router.back()">
          Back
        </el-link>
      </div>
      <slot>
        {{ vTitle }}
      </slot>
    </h1>
  </div>
</template>

<script>
import mixinPageTitle from '../mixins/mixinPageTitle';

export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
    noBreadcrumbs: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [mixinPageTitle],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
  .page-title {
    background-color: #fafafa;
    margin: -20px -20px 20px -20px;
    padding: 20px;
    h1 {
      margin: 0;
    }
  }
  .page-title-breadcrumbs {
    margin-bottom: 10px;
  }
</style>
