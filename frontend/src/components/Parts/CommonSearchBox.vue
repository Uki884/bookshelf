<template>
  <div class="search_box">
    <input
      :value="value"
      placeholder="キーワード or ISBNで検索"
      @input="$emit('input', $event.target.value)">
    <v-icon
      scale="1.5"
      name="search"
      @click="$emit('click')" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
  }
}
</script>

<style lang="scss" scoped>

.search_box {
  position: relative;
  margin: 12px;
  display: flex;
  align-items: center;
  input{
    width: 100%;
    border: 1px solid #999;
    padding: 4px 10px;
    border-radius: 20px;
    height: 2.2em;
    overflow: hidden;
    &:focus {
    outline: 0;
    }
  }
}
.fa-icon {
  position: absolute;
  right: 6px;
}

</style>