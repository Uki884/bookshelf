export default {
  methods: {
    isSmartPhone() {
      const isSmartPhone = this.ismobile(window.navigator).phone
      return isSmartPhone
    },
    isTablet() {
      const isTablet = this.ismobile(window.navigator).tablet
      return isTablet
    },
    isMobile() {
      return this.isSmartPhone() || this.isTablet()
    },
    isNotMobile() {
      return !this.isSmartPhone() || !this.isTablet()
    },
  },
}
