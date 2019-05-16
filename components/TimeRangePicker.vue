<template>
  <div>
    <el-date-picker
      v-model="value"
      type="datetimerange"
      :placeholder="placeholder"
      :picker-options="pickerOptions"
    />
  </div>
</template>

<script>
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export default {
  name: 'TimeRangePicker',
  props: {
    value: {
      type: Array,
      default: () => [
        moment().format(dateFormat),
        moment().format(dateFormat),
      ],
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['input'],
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '1 Month',
            onClick: (picker) => {
              const mStart = moment((this.value || [])[0] || Date.now()).clone().startOf('day');
              const mEnd = mStart.clone().add(1, 'month');
              picker.$emit('pick', [mStart.toDate(), mEnd.toDate()]);
            },
          },
          {
            text: '1 Year',
            onClick: (picker) => {
              const mStart = moment((this.value || [])[0] || Date.now()).clone().startOf('day');
              const mEnd = mStart.clone().add(1, 'year');
              picker.$emit('pick', [mStart.toDate(), mEnd.toDate()]);
            },
          },
        ],
      },
    };
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
