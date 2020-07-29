import axios from 'axios'
import router from '@/router/index.js'

// const baseDomain = 'https://api.openbd.jp/v1/get?isbn=';
// const baseURL = `${baseDomain}/api/web`;

const urlDomain = (url) => {
  return url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
}

const api = axios.create({
})

api.interceptors.request.use(
  (config) => {
    let token = window.localStorage.getItem("token")
    const domain = urlDomain(config.url)
    const apiEndPoint = urlDomain(process.env.VUE_APP_API_URL)
    if (domain == apiEndPoint) {
      if (token) {
        config.headers["Authorization"] = `Token ${token}`
      } else {
        router.push("/login")
      }
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

// api.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//         for (let key of Object.keys(error)) {
//         console.log(key);
//         if (error.response.status === 403) {
//             router.push('/error');
//         }
//     }
//     return Promise.reject(error);
// });

export default api
