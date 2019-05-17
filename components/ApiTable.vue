<template>
  <div>
    <el-row v-if="inlineSearch" type="flex" style="justify-content: space-between;">
      <div style="flex: 1">
        <slot />
      </div>
      <div>
        <div class="text-right">
          <el-select v-model="searchField" placeholder="Search in..." style="width: 120px">
            <el-option
              v-for="column in columnsData"
              :key="column.key"
              :label="column.title"
              :value="column.name"
            />
          </el-select>
          <el-input
            type="search"
            v-model="searchStr"
            style="width: 200px"
            placeholder="Type to search..."
          />
        </div>
      </div>
    </el-row>
    <el-table
      v-loading="loading"
      :data="listDisplay"
      :class="tableClassNames"
      :height="tableHeight"
      :size="tableSize"
      :border="resizable"
      @header-dragend="handleHeaderDragEnd"
    >
      <el-table-column
        v-for="column in columnsData"
        :key="column.name"
        :prop="column.name"
        :label="column.title"
        :sortable="column.sortable"
        :sort-method="getSortMethod(column)"
        :width="column.width || 'auto'"
        :min-width="column.minWidth || ''"
        :fixed="column.fixed || false"
      >
        <template
          slot-scope="scope"
        >
          <slot
            :name="`column-${column.name}`"
            v-bind="scope"
          >
            <template v-if="column.type === 'date'">
              {{formatDate(objGet(scope.row, column.name))}}
            </template>
            <template
              v-else-if="column.type === 'price'"
            >
              {{column.getData(scope.row, column).label}}
              <i
                v-if="column.getData(scope.row, column).theme !== 'primary'"
                :class="getPriceIcon(scope.row, column)"
              />
            </template>
            <router-link
                v-else-if="column.type === 'link'"
                :to="column.getLink(scope.row)"
            >
              {{column.getData && column.getData(scope.row) || objGet(scope.row, column.name)}}
            </router-link>
            <el-link
              v-else-if="column.type === 'a-link'"
              :href="column.getLink(scope.row)"
              target="_blank"
            >
              {{column.getData && column.getData(scope.row) || objGet(scope.row, column.name)}}
            </el-link>
            <el-tag
                v-else-if="column.type === 'tag'"
                disable-transitions
            >
              {{column.getData && column.getData(scope.row) || getOptionsValue(scope.row, column)}}
            </el-tag>
            <div v-else-if="column.type === 'tags'">
              <el-tag
                v-for="value in column.getData(scope.row)"
                :key="value"
                :type="objGet(column.themes, value, 'primary')"
                disable-transitions
              >
                {{objGet(column.options || {}, value, value)}}
              </el-tag>
            </div>
            <pre v-else-if="column.type === 'pre'" :class="column.className || ''">{{column.getData && column.getData(scope.row) || objGet(scope.row, column.name)}}</pre>
            <div v-else-if="column.type === 'thumbnail'">
              <el-image
                style="width: 80px; height: 80px; border-radius: 5px; overflow: hidden;"
                :src="objGet(scope.row, column.name)"
                fit="cover"
                lazy
              />
            </div>
            <template v-else>
              {{column.getData && column.getData(scope.row) || objGet(scope.row, column.name)}}
            </template>
          </slot>
        </template>
      </el-table-column>
      <el-table-column
        v-if="crudActions"
        :prop="primaryKeyNameData"
        label="Actions"
        :min-width="180"
      >
        <template slot-scope="scope">
          <admin-actions
            :base-route="baseRouteData"
            :id="scope.row[primaryKeyNameData]"
            :viewAction="viewAction"
            :editAction="editAction"
            :deleteAction="deleteAction"
            :gen-links="genLinks"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 15, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listFiltered.length"
      style="text-align: center; margin-top: 8px;"
    >
    </el-pagination>
  </div>
</template>

<script>
import _ from 'lodash';
import CSVExporter from 'browser-csv-exporter';
import AdminActions from './AdminActions.vue';

export default {
  name: 'ApiTable',
  components: { AdminActions },
  props: {
    api: { type: String },
    apiMethod: { type: String, default: 'get' },
    apiBody: { type: Object, default: () => ({}) },
    tableClassNames: { type: Array, default: () => ['table-full-width'] },
    columns: { type: Array, default: () => [] },
    primaryKeyName: { type: String, default: '' },
    baseRoute: { type: String, default: '' },
    crudActions: { type: Boolean, default: true },
    version: { type: Number, default: 0 },
    viewAction: { type: String, default: '' },
    editAction: { type: String, default: 'edit' },
    deleteAction: { type: String, default: 'delete' },
    tableHeight: { type: [String], default: undefined },
    tableSize: { type: String, default: 'medium' },
    inlineSearch: { type: Boolean, default: true },
    genLinks: { type: Function, default: () => () => [] },
    resizable: { type: Boolean, default: false },
    transformListData: { type: Function, default: x => x },
    currentPage: { type: Number, default: 1 },
    singlePage: { type: Number, default: 10 },
  },
  data() {
    // eslint-disable-next-line no-nested-ternary
    const defaultSortMethod = ((a, b) => ((String(a) === String(b) ? 0 : (a < b ? -1 : 1))));
    return {
      list: [],
      columnsData: [],
      baseRouteData: '',
      loading: false,
      primaryKeyNameData: '',
      searchField: '',
      searchStr: '',
      colWidth: {},
      defaultSortMethod,
      vSinglePage: this.singlePage,
      vCurrentPage: this.currentPage,
    };
  },
  watch: {
    singlePage(next) { this.vSinglePage = next; },
    currentPage(next) { this.vCurrentPage = next; },
  },
  computed: {
    listFiltered() {
      if (!this.searchStr || !this.searchField) {
        return this.list;
      }
      if (!this.searchStr.trim()) {
        return _.filter(this.list, x => !_.toString(_.get(x, this.searchField).toLowerCase()));
      }
      return _.filter(
        this.list,
        x => _.toString(_.get(x, this.searchField)).toLowerCase()
          .indexOf(this.searchStr.toLowerCase()) !== -1,
      );
    },
    vTotalPages() {
      return _.ceil(this.listFiltered.length / (this.vSinglePage || 1));
    },
    listDisplay() {
      const start = (this.vCurrentPage - 1) * this.vSinglePage;
      const end = start + this.vSinglePage;
      return this.listFiltered.slice(start, end);
    },
  },
  mounted() {
    this.baseRouteData = this.baseRoute || this.$route.path;
    this.loadData();
  },
  watch: {
    version() {
      this.loadData();
    },
  },
  methods: {
    async loadData() {
      this.loading = true;
      if (!this.api) {
        this.loading = false;
        this.list = [];
        return;
      }
      let listRes = [];
      if (this.apiMethod === 'get') {
        listRes = await this.$axios.get(this.api);
      } else {
        listRes = await this.$axios.post(this.api, this.apiBody);
      }
      listRes = listRes.data;
      if (listRes.code === 0) {
        this.list = listRes.data;
      } else {
        this.list = [];
        // toast error message
      }
      this.loading = false;
      this.list = this.transformListData(this.list);
      if (this.list.length) {
        if (_.isEmpty(this.columns)) {
          const columns = _.map(_.keys(_.first(this.list)), x => ({
            name: x,
            title: _.startCase(x),
            sortable: true,
            resizable: this.resizable,
          }));
          this.columnsData = columns;
        } else {
          this.columnsData = _.map(this.columns, x => _.extend({}, {
            sortable: true,
          }, x));
        }
        this.primaryKeyNameData = this.primaryKeyName || this.columnsData[0].name;
        this.columnsData = _.filter(this.columnsData, x => x.type !== 'hidden');
      }
    },
    objGet: _.get,
    handleHeaderDragEnd(newWidth, oldWidth, column) {
      this.colWidth[column.property] = newWidth;
    },
    getOptionsValue(row, column) {
      return _.get(column.options || {}, _.get(row, column.name), _.get(row, column.name));
    },
    getPriceIcon(row, column) {
      return [
        'el-link',
        `el-link--${column.getData(row, column).theme}`,
        column.getData(row, column).theme === 'warning'
          ? 'el-icon-warning-outline'
          : 'el-icon-remove-outline',
      ];
    },
    getSortMethod(column) {
      return (column.sortMethod && column.sortMethod(this.defaultSortMethod, column))
        || this.defaultSortMethod;
    },
    downloadCsv() {
      if (this.loading) {
        this.$message({
          message: 'Data is loading, please wait',
          type: 'error',
        });
        return;
      }
      if (!this.listDisplay.length) {
        this.$message({
          message: 'Data is empty',
          type: 'error',
        });
        return;
      }
      const columns = _.filter(_.map(_.first(this.listDisplay), (v, k) => {
        if (typeof v === 'object') return null;
        return {
          key: k,
          title: _.startCase(k),
        };
      }), Boolean);
      const exporter = new CSVExporter({
        fileName: `${this.$moment().format('YYYY-MM-DD')}`,
        columns,
        data: this.listDisplay,
      });
      exporter.export();
    },
    handleSizeChange(v) {
      this.vSinglePage = v;
    },
    handleCurrentChange(v) {
      this.vCurrentPage = v;
    },
  },
};
</script>

<style lang="less">
  .el-table.table-full-width {
    width: 100%;
  }
  pre.normal {
    font-family: inherit;
  }
</style>
