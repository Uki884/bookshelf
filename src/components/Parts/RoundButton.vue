<template>
  <div
    class="round-button"
    :style="`width: ${width}px;`">
    <span>{{ text }}</span>
    <div
      v-show="isOpen && useSelect"
      class="select">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="select__label"
        :style="option.color ? `color: ${option.color}`: null">
        <span @click="selectItem(option.id)">{{ option.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext} from "@vue/composition-api"

export default defineComponent({
  props: {
    width: {
      type: String,
      default: "86"
    },
    text: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    useSelect: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context: SetupContext) {

    const selectItem = (item: number) => {
      context.emit('click', item)
    }

    return {
      selectItem
    }
  }

})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/btn.scss';

.round-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
    padding: 0.25em 0.5em;
    text-decoration: none;
    color: black;
    background: #ECECEC;
    transition: .4s;
    height: 24px;
    width: 100%;
    border-radius: 8px;
    margin-left: 12px;
    cursor: pointer;
    &--negative {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      display: flex;
      justify-content: center;
      font-weight: bold;
      font-size: 12px;
      padding: 0.25em 0.5em;
      text-decoration: none;
      color: tomato;
      background: #ECECEC;
      transition: .4s;
      height: 24px;
      width: 100%;
      border-radius: 8px;
      margin-left: 12px;
      cursor: pointer;
    }
}

.select {
  z-index: 99;
  width: 100%;
  background: white;
  border-radius: 8px;
  position: absolute;
  padding-bottom: 4px;
  top: 30px;
  &__label {
    padding: 8px;
  }
}

</style>