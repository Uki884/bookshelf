import Vue from 'vue'

//事業所
import Barcode from "@/components/Modal/Book/AddBookBarcode.vue"
import Search from "@/components/Modal/Book/AddBookSearch.vue"
import DeleteBook from "@/components/Modal/Book/DeleteBook.vue"
import DeleteBookShelf from '@/components/Modal/BookShelf/DeleteBookShelf.vue'
import AddBookShelf from '@/components/Modal/BookShelf/AddBookShelf.vue'
import ChangeBookPositionComfirm from "@/components/Modal/ChangePosition/changeBookPositionComfirm.vue"
import ChooseAddBookType from '@/components/Modal/Book/ChooseAddBookType.vue'
import SelectBook from "@/components/Modal/Book/SelectBook.vue"
import BookDetail from "@/components/Modal/Book/BookDetail.vue"

Vue.component("Barcode", Barcode)
Vue.component("Search", Search)
Vue.component("DeleteBook", DeleteBook)
Vue.component("DeleteBookShelf", DeleteBookShelf)
Vue.component("AddBookShelf", AddBookShelf)
Vue.component("ChangeBookPositionComfirm", ChangeBookPositionComfirm)
Vue.component("ChooseAddBookType", ChooseAddBookType)
Vue.component("SelectBook", SelectBook)
Vue.component("BookDetail", BookDetail)