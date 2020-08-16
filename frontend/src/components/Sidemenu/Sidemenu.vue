<template>
  <transition>
    <div
      v-if="isOpen && isUserLoggedIn"
      class="sidemenu"
      :class="isOpen ? 'is_inactive' : 'is_active'"
      :style="sidemenuHeight">
      <div
        v-for="(list, index) in SIDEMENU_LIST"
        :key="index"
        class="sidemenu__contents">
        <div class="sidemenu__title">
          {{ list.title }}
        </div>
        <div
          v-for="(item,index) in list.items"
          :key="index"
          class="sidemenu__item">
          <common-button
            :text="item.text"
            @click="item.action ? action(item.action) : route(item.path)" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalService from '@/services/modal/index.js'
import {SIDEMENU_LIST} from '@/constants/SIDEMENU_LIST.js'
import CommonButton from "@/components/Parts/CommonButton.vue"

export default {
  components: {
    CommonButton
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    isUserLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      SIDEMENU_LIST,
      height: ''
    }
  },
  computed: {
    sidemenuHeight() {
      return `height: ${this.height}px;`
    }
  },
  mounted() {
    let client_y = document.querySelector("#app").clientHeight
    this.height = client_y - 44
  },
  methods: {
    handleSidemenu(){
      this.$emit('click')
    },
    async action(action) {
      await this.$emit('click')
      await ModalService[action.name](action.type)
    },
    route(path) {
      this.$router.push(path).catch(err => {})
      if (this.isSmartPhone()) {
        this.handleSidemenu()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/btn.scss';

.is_active {

}
.sidemenu {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26px;
    span {
      padding-left: 16px;
    }
    svg {
      cursor: pointer;
    }
  }
    width: 240px;
    background: #F5F5F5;
    height: 100%;
    position: absolute;
    z-index: 9999;
    &__title {
    display: inline-block;
    padding: 0 12px 6px;
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: solid 1px;
    }
    &__close {
    height: 56px;
    margin-left: auto;
    justify-content: space-between;
    padding-right: 18px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    svg {
      cursor: pointer;
    }
  }
  &__contents {
      margin-top: 24px;
  }
  &__icon {
    height: 100%;
    width: 100%;
    text-align: right;
    line-height: 80px;
  }
  &__item {
    display: flex;
    padding-bottom: 18px;
    margin-right: 16px;
    align-items: center;
    justify-content: center;
    height: 44px;
    width: 100%;
    span {
      padding-left: 12px;
    }
    &-wrap {
      display: flex;
    }
  }
}

  .v-enter-active {
    transition: all 1.0s ease 0s;
  }
  .v-leave-active {
  transition: all 0.3s ease 0s;
  }
  .v-leave-active {
  position: absolute;
  }

  .v-enter {
    transform: translateX(-60px);
  }
  .v-enter-to,
  .v-leave {
    transform: translateX(0);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-60px);
  }

</style>