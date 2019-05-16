<template>
  <el-container style="min-height: calc(100vh - 60px - 45px)">
    <el-aside class="aside" :width="isCollapse ? '65px' : '200px'">
      <el-menu
          @select="openRoute"
          style="border-right: none"
          :collapse="isCollapse"
      >
        <el-menu-item-group
            title="Components"
        >
          <el-menu-item
              index="/api-table"
          >
            <i class="el-icon-user" />
            <span slot="title">ApiTable</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
  import mixinAdmins from '../mixins/mixinAdmins';

  export default {
    name: 'SubAppAdmin',
    mixins: [
      mixinAdmins,
    ],
    async beforeCreate() {
      window.webSettings = {};
      let webSettings = {};
      try {
        let { data: res } = await this.$axios.get('/api/admin/landing-page/web-settings');
        if (res.code !== 0) throw new Error('');
        webSettings = res.data;
      } catch (e) {
        webSettings = {};
      }
      window.webSettings = webSettings;
    },
  };
</script>
