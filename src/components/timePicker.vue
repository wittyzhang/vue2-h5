<template>
  <div>
    <van-field
      readonly
      clickable
      name="datetimePicker"
      :value="valueStr"
      :label="$lang('还款时间')"
      :placeholder="$lang('点击选择时间')"
      :min-date="minDate"
      :max-date="maxDate"
      @click="showPicker = true"
    />
    <van-calendar
      type="range"
      v-model="showPicker"
      @confirm="onConfirm"
      @cancel="showPicker = false"
      :minDate="minDate"
      :maxDate="maxDate"
      color="#D4633B"
    />
  </div>
</template>
<script>
import { parseTime } from '@/utils/index'
export default {
  name: 'TabBar',
  props: {
    value: Array,
    label: {
      type: String,
      default: '选择器'
    },
    placeholder: String,
    columns: []
  },
  data() {
    return {
      showPicker: false,
      valueStr: '',
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2060, 11, 31)
    }
  },
  watch: {
    // value: function(newVal) {
    //   console.log(newVal)
    //   this.valueStr = newVal.join('-')
    // }
  },
  methods: {
    formatDate(date) {
      console.log(date)
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },
    onConfirm(date) {
      const [start, end] = date
      this.showPicker = false
      const str = `${parseTime(start, '{y}-{m}-{d}')} - ${parseTime(end, '{y}-{m}-{d}')}`
      this.valueStr = str
      this.$emit('onConfirm', { start: parseTime(start), end: parseTime(end) })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navBarBtn {
  color: #ffffff;
}
</style>
