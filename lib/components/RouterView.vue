<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import mixinPageTitle from '../mixins/mixinPageTitle';

export default {
  name: 'empty-router-view',
  mixins: [mixinPageTitle],
};
</script>
