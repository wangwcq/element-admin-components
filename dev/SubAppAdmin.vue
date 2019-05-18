<template>
  <el-container style="min-height: calc(100vh - 60px - 45px)">
    <el-aside class="aside" :width="isCollapse ? '65px' : '200px'">
      <el-menu
          @select="openRoute"
          style="border-right: none"
          :collapse="isCollapse"
      >
        <el-menu-item-group
            v-for="group in menuItems"
            :key="group.groupTitle"
            :title="group.groupTitle"
        >
          <el-menu-item
              v-for="item in group.children"
              :key="item.route"
              :index="item.route"
          >
            <i :class="item.icon" />
            <span slot="title">
              {{item.title}}
            </span>
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
    beforeCreate() {
      this.$ctx.apiBase = '/api/admin';
    },
    data() {
      const routes = _.clone(this.$route.matched);
      return {
        isCollapse: false,
        menuItems: [
          {
            groupTitle: this.$t('app.app.groups.Components'),
            children: [
              {
                route: '/api-table',
                title: this.$t('views.ApiTable.title'),
                icon: 'el-icon-s-grid',
              },
              {
                route: '/model-form',
                title: this.$t('views.ModelForm.title'),
                icon: 'el-icon-edit-outline',
              },
            ],
          },
        ]
      };
    },
  };
</script>
