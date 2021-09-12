<template>
  <div class="nav">
    <div class="nav__contents">
        <div class="nav__link"><a href="//opensea.io/collection/canvas-confetti" target="_blank">Shop</a></div>
        <NuxtLink class="nav__link" to="/about">About</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class NavBar extends Vue {

}
</script>