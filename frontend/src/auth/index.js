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
    await this.isLoggedIn()
  }

  async isLoggedIn() {
    const result = await this.auth0Client.isAuthenticated()
    await this.getUser()
    return result
  }

  async getUser() {
    return await this.auth0Client.getUser()
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
      const user = await this.auth0Client.getUser()
      return { appState: result.appState, user }
    } catch (e) {
      this.error = e
    } finally {
      this.loading = false
    }
  }

  async loginWithRedirect(o) {
    return await this.auth0Client.loginWithRedirect(o)
  }

  async logout(o) {
    this.auth0Client.logout(o)
  }
}

const auth0 = new Auth()

export default auth0