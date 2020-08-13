import { reactive, SetupContext, ref } from "@vue/composition-api"
import Quagga from "quagga"
import { RepositoryFactory } from "@/api/Factory/index.js"

export default function useBarcodeScanner() {
  const barcodeResult = ref({}) as any
  const isDetected = ref(false)
  const isFailed = ref(false)
  const state = reactive({
    settings: {
      inputStream: {
        type: "LiveStream",
        target: document.querySelector("#interactive"),
        constraints: {
          facingMode: "environment",
        },
        area: {
          top: "30%", // top offset
          right: "0%", // right offset
          left: "0%", // left offset
          bottom: "30%", // bottom offset
        },
        singleChannel: false,
      },
      frequency: 10000,
      numOfWorkers: navigator.hardwareConcurrency || 4,
      locator: {
        halfSample: true,
        patchSize: "large",
      },
      decoder: {
        readers: [
          {
            format: "ean_reader",
            config: {},
          },
        ],
      },
      locate: true,
    },
  })

  const CaptureStart = async () => {
    await Quagga.init(state.settings, (err: any) => {
      if (!err) {
        isDetected.value = false
        Quagga.start()
      }
    })
    Quagga.onDetected(async (result: any) => {
      await CaptureStop()
      console.log(result)
      if (result.codeResult.code.length) {
        await getBook(result.codeResult.code)
      }
    })
  }

  const CaptureStop = async () => {
    await Quagga.stop()
    isDetected.value = false
  }

  const getBook = async (isbn: string) => {
    isFailed.value = false

    const rakutenApi = RepositoryFactory.get('rakuten')
    const openbdApi = RepositoryFactory.get("openbd")

    try {
      const result = await Promise.all([
        openbdApi.getBook(isbn),
        rakutenApi.getBook(isbn)
      ])

      let rakutenData = null
      let openbdData = null
      const openbd = result[0]
      const rakuten = result[1]
      if (!openbd.data.length && !rakuten.data.Items.length) {
        isFailed.value = true
      }
      if (openbd.data.length) {
        openbdData = {
          isbn: openbd.data[0].summary.isbn,
          title: openbd.data[0].summary.title,
          publisher: openbd.data[0].summary.publisher,
          cover: openbd.data[0].summary.cover,
          author: openbd.data[0].summary.author,
        }
      }
      if (rakuten.data.Items.length) {
        rakutenData = {
          isbn: rakuten.data.Items[0].Item.isbn,
          price: rakuten.data.Items[0].Item.itemPrice,
          title: rakuten.data.Items[0].Item.title,
          cover: rakuten.data.Items[0].Item.largeImageUrl,
          publisher: rakuten.data.Items[0].Item.publisherName,
          author: rakuten.data.Items[0].Item.author,
        }
      }
      const book = { ...rakutenData, ...openbdData }
      barcodeResult.value = book
      isDetected.value = true
    } catch (err) {
      console.log(err)
    }
  }
  return {
    barcodeResult,
    isFailed,
    isDetected,
    CaptureStart,
    CaptureStop,
  }
}