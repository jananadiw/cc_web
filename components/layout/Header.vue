<template>
  <div class="header">
    <div class="logo">
    <NuxtLink class="logo__link" to="/"><nuxt-img src="/cc_logo.png" sizes="sm:100vw md:80vw lg:700px"/></NuxtLink>
    </div>
    <NavBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NavBar from '~/components/layout/NavBar.vue'

@Component({ components: { NavBar } })
export default class Header extends Vue {

}
</script>
