<template>
  <el-container>
    <el-header class="header">
      <el-row type="flex" class="header-row">
        <div class="flex">
          <el-dropdown @command="selectApp" class="mr">
            <span class="el-dropdown-link">
              <i class="el-icon-s-grid" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/">Components</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          {{appTitle}}
        </div>
        <div class="header-user-info">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{admin}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">
                <i class="el-icon-remove el-icon--left"></i>
                Log out
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </el-header>
    <router-view />
    <el-footer height="45px" class="footer">
      &copy;{{year}} Chris Wang
    </el-footer>
  </el-container>

</template>

<script>
  import mixinAdmins from '../mixins/mixinAdmins';

  export default {
    name: 'Admin',
    mixins: [mixinAdmins],
    props: {
      requireAuth: { type: Boolean, default: true },
    },
    data() {
      return {
        year: this.$moment().format('YYYY'),
      };
    },
    computed: {
      appTitle() {
        const r = _.find(this.$route.matched, x => x.meta && x.meta.appTitle);
        if (!r) return '';
        return r.meta.appTitle || '';
      },
    },
    methods: {
      selectApp(ev) {
        this.gotoCommand(ev);
      },
    },
  };
</script>

<style lang="less">
  .header {
    background: #fff;
    line-height: 60px;
    border-bottom: solid 1px #DCDFE6;
    .header-row {
      justify-content: space-between;
    }
  }
  .aside {
    border-right: solid 1px #DCDFE6;
  }
  .footer {
    background-color: #fafafa;
    text-align: center;
    font-size: 12px;
    line-height: 45px;
    border-top: solid 1px #dcdfe6;
    color: #dcdfe6;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-form-item .el-form-item {
    margin-bottom: 12px;
  }
  .el-tag + .el-tag {
    margin-left: 4px;
  }
</style>
