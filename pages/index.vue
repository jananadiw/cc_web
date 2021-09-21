<template>
<div class="page-wrapper">
 <div class="page-content">
    <div class="gallery">
     <div class="gallery__item" v-for="(item, index) in artDetails" :key="index">
        <a href="#" class="gallery__link">
          <img :src="require(`~/assets/images/${item.name}.${item.ext}`)" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{item.caption}}</span><br/>
          </div>
        </a>
      </div>
    </div>
 </div>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Home extends Vue {
  private artDetails = []; // define type; IArt

  private async mounted(): Promise<void> {
    this.artDetails = (await import('../test/mockData.json')).default as unknown as [];
    console.log('arts', this.artDetails)
  }

}
</script>
