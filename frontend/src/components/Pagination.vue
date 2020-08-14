<template>
  <div class="pagination" v-if="pagination.count >= 1">
    <div class="pagination__result">
      {{ pagination.count }}件の結果
    </div>
    <div class="pagination__buttons">
      <div
        v-show="currentPage > 1"
        class="pagination__button"
        @click="change(currentPage - 1)">
        <span>&lt;</span>
      </div>
      <div
        v-for="(page, index) in pages"
        :key="index"
        class="pagination__button"
        :class="{selected: page === value}">
        <button @click="change(page)">
          {{ page }}
        </button>
      </div>
      <div
        v-show="currentPage < pagination.pageCount"
        class="pagination__button"
        @click="change(currentPage + 1)">
        <span>&gt;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Number,
      default: 1
    }
  },
  computed: {
    pages() {
      let start = Math.max(this.currentPage - 2, 1)
      const end = Math.min(start + 5, this.pagination.pageCount)
      start = Math.max(end - 5, 1)
      return [...new Array(end - start + 1)].map((v, i) => i + start)
    },
    currentPage: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    change(page) {
      this.currentPage = page
      this.$emit('click')
    },
  }
}
</script>

<style lang="scss" scoped>

.pagination{
  width: 100%;
  &__result {
      font-size: 14px;
  };
  &__buttons {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
  }
  &__button {
    border: 0;
    padding: 6px;
    border-radius: 3px;
    margin-right: 4px;
    background: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 18px;
    max-width: 18px;
    button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      outline: none;
    }
  }
}

  .selected {
    color: white;
    background-color: #444444;
  }

</style>