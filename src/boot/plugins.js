import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const deepCopy = (src) => { return JSON.parse(JSON.stringify(src)) }
const randomArray = (array) => { return array[Math.floor(Math.random() * array.length)] }
const randomNumber = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min }

const notifyWhenDone = function (err) {
  if (err) {
    // Do something with the error
    console.error(err)
  }
  // called when the command is completed successfully,
  // or when the action terminated with an error.
}

const sendLine = (text) => {
  const cmdName = window.lpTag.agentSDK.cmdNames.write
  console.info('sending text to input: ' + JSON.stringify(text))
  window.lpTag.agentSDK.command(cmdName, text, notifyWhenDone)
}

const sendSC = (content) => {
  const cmdName = window.lpTag.agentSDK.cmdNames.writeSC
  console.info('sending text to input: ' + JSON.stringify(content))
  window.lpTag.agentSDK.command(cmdName, content, notifyWhenDone)
}

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  app.config.globalProperties.$deepCopy = deepCopy
  app.config.globalProperties.$randomArray = randomArray
  app.config.globalProperties.$randomNumber = randomNumber
  app.config.globalProperties.$sendLine = sendLine
  app.config.globalProperties.$sendSC = sendSC
})
