<template>
  <div class="form-item">
    <div
      v-if="label"
      class="form-item__label">
      {{ name }}
      <span
        v-if="required"
        class="form-item__require">必須</span>
    </div>
    <div class="form-item__input">
      <div class="underline">
        <input
          :id="name"
          :type="inputType"
          :value="value"
          :placeholder="label ? '' : name"
          @input="$emit('input', $event.target.value)">
        <label :for="name">{{ name }}</label>
      </div>
      <div class="validation-message">
        {{ errorMessage[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean
    },
    label: {
      type: Boolean,
      default: true
    },
    inputType: {
      type: String,
      default: 'text'
    }
  }

}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/form.scss';

</style>