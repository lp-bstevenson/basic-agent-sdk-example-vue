<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view  />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { defineComponent, ref } from 'vue'
import { coreStore } from '../stores/store-core'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(coreStore, ['defaultApp'])
  },
  methods: {
    ...mapActions(coreStore, ['setDefaultApp'])
  },
  async mounted () {
    const { siteId } = this.$route.query
    if (siteId) window.sessionStorage.setItem('siteId', siteId)
  }
})
</script>

<style lang="scss" scoped>

</style>
