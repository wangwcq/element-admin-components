<template>
  <el-form
    :model="model"
    label-width="200px"
    @submit.native.prevent="onSubmitForm"
    :label-position="labelPosition"
  >
    <div
      v-for="field in fieldsData"
      :key="field.name"
      v-show="field.type !== 'hidden'"
    >
      <el-form-item
        :label="hideLabel ? undefined : `${field.title}：`"
        :required="field.required"
        v-if="vIf(field.vIf, field.name, field.defaultValue)"
      >
        <slot
          :name="`field-${field.name}`"
          v-bind:model="model"
          v-bind:field="field"
        >
          <div
            v-if="readonly"
          >
            {{hideLabel && `${field.title}：`}}
            {{model[field.name]}}
          </div>
          <el-input
            v-else-if="field.type === 'text-input'"
            :type="field.password ? 'password' : 'text'"
            :show-password="field.showPassword || false"
            v-model="model[field.name]"
            :placeholder="(hideLabel && field.title) || ''"
          />
          <el-input
            v-else-if="field.type === 'price'"
            v-model="model[field.name]"
            :placeholder="(hideLabel && field.title) || ''"
          >
            <template slot="prepend">{{field.prefix || 'CNY'}}</template>
          </el-input>
          <el-date-picker
            v-else-if="field.type === 'datetime'"
            v-model="model[field.name]"
            type="datetime"
            :placeholder="(hideLabel && field.title) || ''"
            :editable="defaultValue(field.editable, true)"
          />
          <time-range-picker
            v-else-if="field.type === 'timerange'"
            v-model="model[field.name]"
            :placeholder="(hideLabel && field.title) || ''"
          />
          <el-input
            v-else-if="field.type === 'readonly'"
            v-model="model[field.name]"
            readonly
            :placeholder="(hideLabel && field.title) || ''"
          />
          <el-input
            v-else-if="field.type === 'disabled'"
            v-model="model[field.name]"
            disabled
            :placeholder="(hideLabel && field.title) || ''"
          />
          <el-input
            v-else-if="field.type === 'text' || field.type === 'pre'"
            type="textarea"
            v-model="model[field.name]"
            :autosize="{ minRows: 3, maxRows: 20 }"
            :placeholder="(hideLabel && field.title) || ''"
          />
          <div v-else-if="field.type === 'radio'">
            <el-radio
              v-for="(label, value) in field.options"
              :key="value"
              :label="value"
              size="small"
              v-model="model[field.name]"
            >
              {{label}}
            </el-radio>
          </div>
          <reference-select
            v-else-if="field.type === 'reference'"
            :apiBody="field.referenceApiBody"
            :api="field.api"
            :model="field.reference"
            :field-title="field.fieldTitle || 'title'"
            v-model="model[field.name]"
            :disabled="field.disabled"
            :show-count="field.showCount || false"
            :filterable="defaultValue(field.filterable, true)"
          />
          <el-select
            v-else-if="field.type === 'select'"
            v-model="model[field.name]"
            style="width: 100%"
            clearable
            filterable
            allow-create
            default-first-option
            :placeholder="(hideLabel || '') && field.title"
          >
            <el-option
              v-for="(label, value) in field.options"
              :key="value"
              :label="label"
              :value="value"
            />
          </el-select>
          <admin-editor
              v-else-if="field.type === 'htmleditor'"
              v-model="model[field.name]"
          />
          <div
            v-else-if="field.type === 'repeated'"
          >
            <el-form-item
              v-for="(m, mIndex) in model[field.name]"
              :key="mIndex"
              label="x"
            >
              <div slot="label">
                <el-tooltip>
                  <div slot="content">
                    <el-link type="danger" @click="() => model[field.name].splice(mIndex, 1)">
                      <i class="el-icon-delete-solid" />
                      Delete
                    </el-link>
                  </div>
                  <el-button type="text">
                    {{`${field.title} ${mIndex + 1}`}}
                  </el-button>
                </el-tooltip>
              </div>
              <model-form
                :model="m"
                :fields="field.fields"
                submit-text=""
              />
            </el-form-item>
            <el-button
              icon="el-icon-circle-plus-outline"
              type="primary"
              plain
              @click="() => model[field.name].push(cloneDeep(field.defaultValues))"
            >
              Add {{field.title}}
            </el-button>
          </div>
        </slot>
      </el-form-item>
    </div>
    <el-form-item v-if="!readonly && submitText">
      <el-button :class="btnClass" type="primary" @click="onSubmitForm">{{submitText}}</el-button>
      <slot name="buttons"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import _ from 'lodash';
import ReferenceSelect from './ReferenceSelect.vue';
import TimeRangePicker from './TimeRangePicker.vue';
import AdminEditor from "./AdminEditor.vue";

export default {
  name: 'ModelForm',
  components: {AdminEditor, TimeRangePicker, ReferenceSelect },
  props: {
    model: { type: Object },
    fields: { type: Array },
    readonly: { type: Boolean, default: false },
    submitText: { type: String, default() {
      return this.$t('modelForm.buttons.save');
    }},
    labelPosition: { type: String, default: 'right' }, // Options: right, top
    hideLabel: { type: Boolean, default: false },
    btnClass: { type: String, default: '' },
  },
  events: ['submit'],
  data() {
    return {
      fieldsData: [],
    };
  },
  watch: {
    fields() {
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.fieldsData = _.map(this.fields || [], x => _.merge({}, {
        name: '',
        title: '',
        type: 'text-input',
        vIf: () => true,
      }, x));
    },
    onSubmitForm() {
      this.$emit('submit', this.model);
    },
    vIf(func = () => true, fieldName, defaultValue = '') {
      if (func(this.model)) {
        return true;
      }
      this.$set(this.model, fieldName, defaultValue);
      return false;
    },
    cloneDeep: _.cloneDeep,
    defaultValue(value, dValue) {
      return _.isUndefined(value) ? dValue : value;
    },
  },
};
</script>
