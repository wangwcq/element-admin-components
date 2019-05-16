<template>
  <div class="table-admin-actions">
    <el-button v-if="viewAction" type="primary" size="small" @click="onView">View</el-button>
    <el-button v-if="editAction" type="primary" size="small" @click="onEdit">Edit</el-button>
    <el-button v-if="deleteAction" type="default" size="small" @click="onDelete">Delete</el-button>
    <el-dropdown v-if="links.length" @command="handleLinks">
      <el-button type="default" size="small">
        Links
        <i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in links"
          :key="item.title"
          :command="item.link"
        >
          {{ item.title }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'AdminActions',
  props: {
    baseRoute: { type: String, default: '' },
    id: { type: [String, Number] },
    viewAction: { type: String, default: '' },
    editAction: { type: String, default: 'edit' },
    deleteAction: { type: String, default: 'delete' },
    genLinks: { type: Function, default: () => () => [] },
  },
  computed: {
    links() {
      return this.genLinks(this.id);
    },
  },
  methods: {
    onView() {
      this.$router.push(`${this.baseRoute}/${this.viewAction}/${this.id}`);
    },
    onEdit() {
      this.$router.push(`${this.baseRoute}/${this.editAction}/${this.id}`);
    },
    onDelete() {
      this.$router.push(`${this.baseRoute}/${this.deleteAction}/${this.id}`);
    },
    handleLinks(command) {
      this.$router.push(command);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
