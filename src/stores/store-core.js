/* eslint-disable camelcase */
import jwtDecode from 'jwt-decode'
import { defineStore } from 'pinia'
import axios from 'axios'
import { Notify } from 'quasar'

const sessionLength = 4 * (1000 * 60 * 60)
const proactveRetry = 3

const notifyError = async (message, caption, actions) => {
  Notify.create({
    message,
    caption,
    icon: 'o_error_outline',
    position: 'top',
    classes: 'error-banner',
    actions
  })
}

export const coreStore = defineStore('core', {
  persist: true,
  state: () => ({
    defaultApp: null,
    LPDOMAINS: [],
    zone: 'z3',
    retry: 3,
    siteId: null,
    AUTH: null,
    TOKEN: null,
    remainingSession: 0,
    proactiveToken: null,
    proactiveConfig: {
      client_id: null,
      client_secret: null,
      access_token: null
    },
    SKILLS: []
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    /* CONVERSATIONAL CLOUD FUNCTIONS */
    async getUser (id) {
      // eslint-disable-next-line no-unused-vars
      try {
        const { AUTH, LPDOMAINS, siteId } = this
        id = id || AUTH.decoded.sub
        const authorization = `Bearer ${AUTH.access_token}`
        const domain = LPDOMAINS.accountConfigReadWrite
        if (!authorization || !id) { return }
        console.log(id)
        const config = {
          method: 'get',
          headers: {
            domain,
            authorization
          },
          url: `/api/user/${siteId}/${id}`
        }
        const response = await axios(config)
        return response.data
      } catch (error) {
        console.error(error)
        // console.log('log out!!')
        // dispatch('auth/logOut', null, { root: true })
      }
    },
    async getSkills () {
      const { AUTH } = this
      try {
        if (!AUTH) return
        const authorization = `Bearer ${AUTH.access_token}`
        const { accountConfigReadWrite: domain } = this.LPDOMAINS
        if (!AUTH.access_token) { return }
        const config = {
          method: 'get',
          headers: { domain, authorization },
          url: `/api/skills/${this.siteId}`
        }
        const response = await axios(config)
        console.log(response.data)
        this.SKILLS = response.data
        return response.data
      } catch (err) {
        console.error(err)
        return null
      }
    },
    async login () {}
  }
})
