<template>
  <div>
    <van-field
      readonly
      clickable
      name="picker"
      :value="valueStr"
      :label="label"
      :placeholder="placeholder"
      :rules="rules"
      :required="required"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        v-if="custom"
        show-toolbar
        :columns="options"
        value-key="value"
        @confirm="onConfirm($event, options)"
        @cancel="showPicker = false"
        ref="optionPicker"
      >
        <template #option="option">
          <div style="display: flex; flex-direction: column; align-items: center">
            <div>{{ option.text }}</div>
          </div>
        </template>
        <template #confirm>{{ $lang('确定') }}</template>
      </van-picker>
      <van-picker
        v-else
        show-toolbar
        :columns="options"
        @confirm="onConfirm"
        @cancel="showPicker = false"
        ref="optionPicker"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'TabBar',
  props: {
    value: String,
    label: {
      type: String,
      default: '选择器'
    },
    placeholder: String,
    options: Array,
    rules: Array,
    required: {
      type: Boolean,
      default: false
    },
    custom: {
      type: Boolean,
      default: false
    } // 是否自定义 默认为否
  },
  data() {
    return {
      showPicker: false,
      valueStr: ''
    }
  },
  mounted() {},
  watch: {
    options: function () {}
  },
  methods: {
    onConfirm(obj) {
      this.valueStr = this.custom ? this.setStr(obj) : obj
      this.showPicker = false
      this.$emit('onConfirm', obj)
    },
    setStr(obj) {
      let str = ''
      let strArray = []
      const ref = this.$refs.optionPicker
      if (Array.isArray(obj)) {
        obj.map((item, index) => {
          strArray.push(ref.getColumnValue(index).text)
        })
        str = strArray.join(' / ')
      } else {
        str = obj.text
      }
      return str
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
