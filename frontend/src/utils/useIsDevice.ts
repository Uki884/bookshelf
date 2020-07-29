import { ref, onMounted } from "@vue/composition-api"
import mobile from "ismobilejs"

export const isSmartPhone =  () => {
  const isSmartPhone = mobile(window.navigator).phone
  return isSmartPhone
}

export const isNotMobile = () => {
  return !isSmartPhone()
}