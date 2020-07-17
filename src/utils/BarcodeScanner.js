import Quagga from "quagga"
import store from "@/store/index.js"

const settings = {
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
  frequency: 100,
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
}

export class Caputure {
  CaptureStart() {
    Quagga.init(settings, (err) => {
      if (!err) {
        Quagga.start()
      }
    })
    Quagga.onDetected(async (result) => {
      console.log(result)
      Quagga.stop()
      if (result.codeResult.code.length) {
        setTimeout(() => {
          store.dispatch("book/getBook", result.codeResult.code)
        }, 2000)
      }
    })
    return this.detect
  }
  CaptureStop() {
    Quagga.stop()
  }
}
