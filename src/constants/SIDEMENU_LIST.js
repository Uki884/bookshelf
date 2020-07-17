export const SIDEMENU_LIST = {
  main: {
    title: "本棚",
    items: [
      // {
      //   text: "ダッシュボード",
      //   path: "/dashboard",
      //   icon: "",
      //   visible: false,
      // },
      {
        text: "新しい本棚を作成する",
        action: { name: "addBookShelf" },
        icon: "",
        visible: true,
      },
      // {
      //   text: "みんなの本棚",
      //   path: "/bookshelf",
      //   icon: "",
      //   visible: false,
      // },
      {
        text: "わたしの本棚",
        path: "/my_bookshelf/",
        icon: "",
        visible: true,
      },
    ],
  },
  // management: {
  //   title: "各種設定",
  //   items: [
  //     {
  //       text: "アプリ設定",
  //       path: "",
  //       action: { name: "addBook", type: "barcode" },
  //       icon: "",
  //     },
  //   ],
  // },
}
