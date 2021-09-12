<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import Header from '~/components/layout/Header.vue';

@Component({
  components: { Header},
})
export default class Home extends Vue {

}
</script>
