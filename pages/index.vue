<template>
<div class="page-wrapper">
 <div class="page-content">
    <div class="gallery">
     <!-- <div class="gallery__item" v-for="(item, index) in artworkKeys" :key="index">
        <a href="#" class="gallery__link">
        <img :src="generateImageUrl" :alt="`img${generateImageUrl}`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{item}}</span><br/>
          </div>
        </a>
      </div> -->
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Best_Window.jpg" :alt="`img1`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "Best Window Is Open" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Surf_Crowd.jpg" :alt="`img11`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "Surf Crowd" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Cozy_Campers.jpg" :alt="`img2`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "Cozy Campers" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Doggo.jpg" :alt="`img3`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "The Best Friend" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Dreams.jpg" :alt="`img4`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "Dreams" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Forehead_Or_Lips.jpg" :alt="`img5`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "Lips or Forehead?" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Girl_LookingDown.jpg" :alt="`img6`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "In a hurry" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Mind_Games.jpg" :alt="`img7`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "Mind Games" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Post_Covid.jpg" :alt="`img8`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "Post Covid Roads" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Reigning.jpg" :alt="`img9`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "Reigning" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Hug_Me 2.jpg" :alt="`img11`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "A Warm Hug" }}</span><br/>
          </div>
        </a>
        <a href="#" class="gallery__link">
        <img src="https://janawcontent.s3.ap-northeast-2.amazonaws.com/Fiji_From_Far.jpg" :alt="`img11`" class="gallery__image" />
          <div class="gallery__overlay">
            <span>{{ "Fuji from Afar" }}</span><br/>
          </div>
        </a>
      </div>
    </div>
 </div>
<!-- </div> -->
</template>
<script lang="ts" setup>
// import { onMounted, computed, reactive } from 'vue'
// import { ListObjectsCommand } from '@aws-sdk/client-s3'
// import { s3Client } from '../libs/s3Client' // Helper function that creates an Amazon S3 service client module.

// const artworkKeys: (string | undefined)[] | undefined = reactive([])
// const imageUrl: string = ''

// const bucketParams = {
//   Bucket: 'janawcontent'
// }

// const run = async () => {
//   try {
//     // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
//     const data = await s3Client.send(new ListObjectsCommand(bucketParams))
//     artworkKeys = data.Contents?.map((item) => item.Key)
//     return await data
//   } catch (err) {
//     console.log('Error', err)
//   }
// }

// onMounted(() => {
//   run()
// })

// const generateImageUrl = computed(() => {
//   artworkKeys?.map((key) => {
//     imageUrl = `https://${bucketParams.Bucket}.s3.ap-northeast-2.amazonaws.com/${key}`
//   })
//   console.log(imageUrl)
//   return imageUrl
// })

</script>
