import mobile from "ismobilejs"

export default {
  methods: {
    isSmartPhone(): boolean {
      const isSmartPhone = mobile(window.navigator).phone
      return isSmartPhone
    },
    isTablet(): boolean {
      const isTablet = mobile(window.navigator).tablet
      return isTablet
    },
    isMobile(): boolean {
      return this.isSmartPhone() || this.isTablet()
    },
    isNotMobile(): boolean {
      return !this.isSmartPhone() || !this.isTablet()
    },
  },
}
