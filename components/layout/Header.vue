<template>
  <div class="header">
    <NavBar />
    <div class="header__logo">
    <NuxtLink class="logo__link" to="/"><img src="~assets/images/cc_logo.png"></NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import NavBar from '~/components/layout/NavBar.vue';

@Component({components: {NavBar},})
export default class Header extends Vue {

}
</script>
