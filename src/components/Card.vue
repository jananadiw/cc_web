<template>
  <div class="card">
    <!-- <div v-show="currentElementIndex === index" class="fade">
          <slot/>
      </div> -->
  <div class="fade">
    <img
      class="card-icon"
      :src="require(`@/assets/${imgName}`)"
      alt="card icon"
      :style="{  width: mode === 'landscape' ? '550px' : '350px' }"
    />
    <!-- <div class='card-content'>
      <h3 class='headline'>{{headline}}</h3>
      <p>{{text}}</p>
    </div> -->
  </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    imgName: String,
    mode: String,
    currentElementIndex: Number
  }
}
</script>

<style src="../assets/styles/Card.css" scoped>
