<template>
  <div v-loading="loading">
    <el-select
      :value="value"
      placeholder="Please select..."
      @input="updateValue"
      :filterable="filterable"
      clearable
      :disabled="disabled"
    >
      <el-option
        v-for="item in options"
        :key="item[fieldValue]"
        :label="item[fieldTitle]"
        :value="item[fieldValue]"
      >
        <slot
          name="option"
          :option="item"
        >
          <span class="pull-right text-caption">{{item[fieldValue]}}</span>
          {{item[fieldTitle]}}
        </slot>
      </el-option>
    </el-select>
    <span class="ml text-smaller" v-if="showCount && options.length > 1">
      ({{options.length}} options)
    </span>
  </div>
</template>

<script>
export default {
  name: 'ReferenceSelect',
  props: {
    api: {},
    model: {},
    value: {},
    fieldValue: { type: String, default: 'id' },
    fieldTitle: { type: String, default: 'title' },
    disabled: { type: Boolean, default: false },
    showCount: { type: Boolean, default: false },
    filterable: { type: Boolean, default: true },
  },
  emit: ['input'],
  data() {
    return {
      vApi: this.api || `${this.$ctx.apiBase}/${this.model}/list`,
      options: [],
      loading: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        let list = await this.$axios.get(this.vApi);
        list = list.data;
        if (list.code === 0) {
          list = list.data;
        } else {
          throw new Error();
        }
        this.options = list;
      } catch (e) {
        this.options = [];
      }
      this.loading = false;
    },
    updateValue(ev) {
      this.$emit('input', ev);
    },
  },
};
</script>

<style lang="less" scoped>
  .pull-right {
    float: right;
    margin-left: 16px;
  }
  .text-caption {
    font-size: 12px;
    color: #666;
  }
</style>
