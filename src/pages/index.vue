<template>
  <div class="fc ns">
    <pre>
      {{  lpProps  }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {
  },
  data () {
    return {
      accountId: null,
      conversationId: null,
      visitorId: null,
      lpProps: {}
    }
  },
  methods: {
    updateNewProps (a, obj) {
      console.info(`updating model: ${a}`)
      if (!obj) {
        return
      }
      const { lpProps } = this
      const prop = lpProps[a] || {}
      Object.keys(obj).forEach(newProp => {
        if (!newProp) return
        if (!hasOwnProperty.call(lpProps, a) || obj[newProp]) { prop[newProp] = obj[newProp] }
      })
      this.lpProps[a] = prop
    },
    bindProps () {
      const t = this
      const props = {
        chatTranscript: (data) => {
          if (data) { t.updateNewProps('chatTranscript', data.newValue) }
        },
        chattingAgentInfo: (data) => {
          if (data) { t.updateNewProps('chattingAgentInfo', data.newValue) }
        },
        chatInfo: async (data) => {
          if (data) { t.updateNewProps('chatInfo', data.newValue) }
          if (data.newValue.rtSessionId) this.conversationId = data.newValue.rtSessionId
          if (data.newValue.accountId) this.accountId = data.newValue.accountId
        },
        campaignInfo: (data) => {
          if (data) { t.updateNewProps('campaignInfo', data.newValue) }
        },
        visitorInfo: (data) => {
          if (data) {
            t.updateNewProps('visitorInfo', data.newValue)
            if (data.newValue.visitorId) { t.visitorId = data.newValue.visitorId }
          }
        },
        engagementInfo: (data) => {
          if (data) { t.updateNewProps('engagementInfo', data.newValue) }
        },
        visitorJourney: (data) => {
          if (data) { t.updateNewProps('visitorJourney', data.newValue) }
        },
        SDE: (data) => {
          if (data) { t.updateNewProps('SDE', data.newValue) }
        },
        authenticatedData: (data) => {
          if (data) { t.updateNewProps('claimsAndAuthType', data.newValue) }
        },
        claimsAndAuthType: (data) => {
          if (data) { t.updateNewProps('claimsAndAuthType', data.newValue) }
        }
      }

      const notifyWhenDone = function (err) {
        console.info(`BINDING WITH PROPERTY: ${JSON.stringify(err)}`)
      }
      for (const p in Object.keys(props)) {
        window.lpTag.agentSDK.bind(
          Object.keys(props)[p],
          props[Object.keys(props)[p]],
          notifyWhenDone(Object.keys(props)[p])
        )
      }
    },
    notificationHandler (data) {
      console.log(data)
      // Do something with the notifications
    },
    focusHandler () {
      console.log('focus')
      // Do something when the visitor is focused
      // Assume the visitor is focused to begin with
    },
    blurHandler () {
      console.log('blur')
      // Do something when the visitor is blurred
      // Assume the visitor is focused to begin with
    },
    loadSDK () {
      if (!window.lpTag) {
        const sc = document.createElement('script')
        sc.setAttribute('src', 'https://lpcdn.lpsnmedia.net/webagent/client-SDK.min.js')
        document.head.appendChild(sc)
      }
      setTimeout(() => {
        this.initSDK()
      }, 200)
    },
    initSDK () {
      const t = this
      const { agentSDK: SDK } = window.lpTag
      console.info(SDK)
      SDK.init({
        notificationCallback: t.notificationHandler,
        visitorFocusedCallback: t.focusHandler,
        visitorBlurredCallback: t.blurHandler
      })
      setTimeout(() => {
        this.bindProps()
      }, 200)
    }

  },
  props: {
    selectedApp: Object
  },
  mounted () {
    this.loadSDK()
  }
}
</script>

<style>
</style>
