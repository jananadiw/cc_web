<template>
<div class="page-wrapper">
 <div class="page-content">
    <div class="gallery">
     <div class="gallery__item" v-for="(item, index) in artDetails" :key="index">
        <a href="#" class="gallery__link">
          <img :src="require(`~/assets/images/${item.name}.${item.ext}`)" :alt="`test${index}`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{item.caption}}</span><br/>
          </div>
        </a>
      </div>
    </div>
 </div>
</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'

  type IArt = {
    id: number;
    name: string;
    caption: string;
    ext: string;
  }

let artDetails: IArt[] = [] // define type; IArt

onMounted(async () => {
  artDetails = (await import('../test/mockData.json')).default
  console.log('arts', artDetails)
})

</script>
