<template>
  <div class="model-view">
    <el-row type="flex" :gutter="12">
      <el-col
        :span="24 / cols"
        v-for="field in fieldsData"
        :key="field.name"
        v-show="field.type !== 'hidden'"
      >
        <div class="flex-row-justify">
          <div class="model-view-label">{{field.title}}: </div>
          <div class="flex model-view-item">
            <slot
              :name="`field-${field.name}`"
              v-bind:model="model"
              v-bind:field="field"
            >
              <template v-if="field.type === 'password'">******</template>
              <reference-view
                  v-else-if="field.type === 'reference'"
                  :model="field.reference"
                  :value="model[field.name]"
                  :field-title="field.fieldTitle"
                  :do-link-to-entities="field.link"
              ></reference-view>
              <template
                v-else-if="field.type === 'price'"
              >
                {{field.getData(model, field).label}}
                <i
                  v-if="field.getData(model, field).theme !== 'primary'"
                  :class="getPriceIcon(model, field)"
                />
              </template>
              <pre
                  v-else-if="field.type === 'text' || field.type === 'pre'"
                  v-html="model[field.name]"
                  :class="field.className"
              ></pre>
              <div
                  v-else-if="field.type === 'htmleditor'"
                  v-html="model[field.name]"
                  :class="field.className"
              ></div>
              <el-tag
                v-else-if="field.type === 'select'"
                :type="objGet(field.themes, objGet(model, field.name), 'primary')"
                disable-transitions
                size="small"
              >
                {{getOptionsValue(model, field)}}
              </el-tag>
              <template v-else-if="field.type === 'custom'">
                {{(field.getData && field.getData(model)) || model[field.name] || empty}}
              </template>
              <template v-else>
                {{model[field.name] || empty}}
              </template>
            </slot>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash';
import ReferenceView from './ReferenceView.vue';

export default {
  name: 'ModelView',
  props: {
    model: { type: Object },
    fields: { type: Array },
    cols: { type: Number, default: 2 },
    empty: { type: String, default: '---' },
  },
  events: ['submit'],
  components: {
    ReferenceView,
  },
  data() {
    return {
      fieldsData: [],
    };
  },
  mounted() {
    this.fieldsData = _.map(this.fields || [], x => _.extend({}, {
      name: '',
      title: '',
      type: 'text-input',
    }, x));
  },
  methods: {
    onSubmitForm() {
      this.$emit('submit', this.model);
    },
    objGet: _.get,
    getOptionsValue(model, field) {
      return _.get(field.options || {}, _.get(model, field.name), _.get(model, field.name));
    },
    getPriceIcon(model, field) {
      return [
        'el-link',
        `el-link--${field.getData(model, field).theme}`,
        field.getData(model, field).theme === 'warning'
          ? 'el-icon-warning-outline'
          : 'el-icon-remove-outline',
      ];
    },
  },
};
</script>

<style lang="less" scoped>
  .model-view {
    font-size: 13px;
    font-weight: 300;
  }
  .model-view-label {
    flex: 0 0 220px;
    font-weight: bold;
    text-align: right;
    margin: 8px 12px 8px 0;
  }
  .model-view-item {
    margin: 8px 0 8px 0;
  }
  pre.normal {
    font-family: inherit;
  }
</style>
