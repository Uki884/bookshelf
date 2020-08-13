import createAuth0Client from "@auth0/auth0-spa-js"

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

const domain = process.env.VUE_APP_AUTH0_DOMAIN
const client_id = process.env.VUE_APP_AUTH0_CLIENT_ID
const redirect_uri = window.location.origin + "/callback"

export class Auth {
  constructor() {
  }

  async init() {
    this.auth0Client = await createAuth0Client({
      domain: domain,
      client_id: client_id,
      redirect_uri: redirect_uri,
    })
  }

  async isLoggedIn() {
    const result = await this.auth0Client.isAuthenticated()
    return result
  }

  async getUser() {
    const userData = await this.auth0Client.getUser()
    const token = await this.auth0Client.getTokenSilently()
    const idToken = await this.auth0Client.getIdTokenClaims()
    localStorage.setItem("idToken", idToken.__raw)
    return { userData, idToken: idToken.__raw, token }
  }

  async loginWithPopup(o) {
    try {
      await this.auth0Client.loginWithPopup(o)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    } finally {
    }
    return await this.auth0Client.getUser()
  }

  async handleRedirectCallback() {
    this.loading = true
    try {
      const result = await this.auth0Client.handleRedirectCallback()
      return { appState: result.appState }
    } catch (e) {
      this.error = e
    } finally {
      this.loading = false
    }
  }

  async loginWithRedirect(o) {
    return await this.auth0Client.loginWithRedirect(o)
  }

  logout(o) {
    const returnTo = { returnTo: window.location.origin }
    this.auth0Client.logout(returnTo)
    localStorage.removeItem("idToken")
  }
}

const auth0 = new Auth()

export default auth0