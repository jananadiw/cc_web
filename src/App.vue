<template>
  <div id="App">
    <header>
      <img
        src="./assets/cc.png"
        alt=""
      >
    </header>
    <main>
      <!-- <h1>{{ headline }}</h1> -->
      <!-- <div class="section"> -->
        <!-- <h2>{{this.sections[0].headline}}</h2> -->
        <Carousel :cards="cards"/>
      <!-- </div> -->
      <!-- <div class="section"> -->
        <!-- <h2>{{this.sections[1].headline}}</h2> -->
        <!-- <span>
          Read this <a
            href='http://creativecommons.org/licenses/by/3.0/'
            title='Learn about Service Workers'
          >other</a> article of mine!
        </span> -->
      <!-- </div> -->
    </main>
    <footer>
      <Imprint />
    </footer>
  </div>
</template>

<script>
import Imprint from './components/Imprint'
import Carousel from './components/Carousel'
// @Component({
//   name: 'App',
//   components: { Imprint, Carousel }
// })
export default {
  name: 'App',
  components: { Carousel, Imprint },
  data () {
    return {
      cards: [
        {
          imgName: 'Surf_Crowd.jpg',
          mode: 'landscape'
        },
        {
          imgName: 'Sunset_Kayaking.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Balance.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Seascape.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'SunsetFishing.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Unknown.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Sweet_Summer.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Fiji_From_Far.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Climber.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Himalayas.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Hug_Me.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'River_at_Sunset.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Snowy_Arashiyama.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Teal.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Water.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Guitarist.jpg',
          mode: 'portrait'
        },
        {
          imgName: 'Forest.jpg',
          mode: 'landscape'
        },
        {
          imgName: 'sunriseSurfer.jpg',
          mode: 'landscape'
        }
      ]
    }
  }
}
</script>

<style src="./assets/styles/App.css"/>
