<template>
  <Modal
    title="本棚を削除"
    @close="closeModal">
    <template slot="main">
      <div class="Modal__form">
        <div class="Modal__form-item">
          <section>
            <div>本棚の本は全て削除されます。</div>
            <div>本棚を削除してもよろしいですか？</div>
          </section>
        </div>
      </div>
    </template>
    <template slot="footer">
      <div
        class="btn btn--large"
        @click="deleteBookShelf()">
        削除する
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Modal from '@/components/atoms/BaseModal.vue'
import ModalService from '@/services/modal/index.js'
import { mapGetters } from 'vuex'
import { SetupContext, defineComponent, reactive } from '@vue/composition-api'
import { useUserStore } from '@/store/userStore.ts'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'
import { useGrobalStore } from '@/store/grobalStore.ts'

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    Modal
  },
  setup(props: any, context: SetupContext) {

    const { user } = useUserStore()
    const { useGetUserBookShelf, useDeleteBookShelf } = useBookShelfStore()
    const { closeModal } = useGrobalStore()

    const deleteBookShelf = async() => {
      await useDeleteBookShelf(Number(props.params.id))
      await useGetUserBookShelf(user.value.id)
      await closeModal()
    }

    return {
      deleteBookShelf,
      closeModal
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';

#interactive{
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  height: 300px;
  width: 300px;
  z-index: 1;
    video, canvas {
    margin-top: -50px;
    width: 300px;
    height: 400px;
      z-index: 1;
  }
}

.detect {
  &__no-result {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
  }
  &__container {
      display: flex;
      height: 320px;
  }
  &__image {
    width: 50%;
    img {
      height: auto;
      width: 175px;
    }
  }
  &__item {
    width: 50%;
  }
  &__text {
    width: 260px;
    margin: 0 0 auto;
    text-align: left;
    margin-bottom: 16px;
    span {
      padding: 16px;
    }
  }
  &__title {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    padding: 12px;
  }
}
.empty{
  width: 200px;
  height: 50px;
  margin: 24px auto;
  &__text {
    color: tomato;
    font-weight: bold;
    font-size: 20px;
  }
}

  .detect-area {
    position: absolute;
    top: 30%;
    bottom: 30%;
    left: 10%;
    right: 10%;
    z-index: 2;
    border: 2px solid #0000ff;
  }

</style>