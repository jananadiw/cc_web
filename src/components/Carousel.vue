<template>
  <div>
    <div class="card-carousel">
      <ArrowButton
        arrowType="left"
        @click.native="showPrevElement"
        :disabled="this.reachedMaxLeft"
      />
      <div class="fade">
      <Card
        :imgName="currentElement.imgName"
        :mode="currentElement.mode"
        :currentElementIndex="this.currentElementIndex"
      />
      </div>
      <ArrowButton
        arrowType="right"
        @click.native="showNextElement"
        :disabled="this.reachedMaxRight"
      />
    </div>
    <Indicators
      :elements="this.cards"
      :currentElementIndex="this.currentElementIndex"
      :showElement="this.showElement"
    />
  </div>
</template>
<script>
import Card from './Card.vue'
import ArrowButton from './ArrowButton.vue'
import Indicators from './Indicators.vue'

export default {
  name: 'Carousel',
  props: { cards: Array },
  components: { Card, ArrowButton, Indicators },

  data () {
    return {
      currentElementIndex: 0
    }
  },
  computed: {
    currentElement () {
      return this.cards[this.currentElementIndex]
    },
    reachedMaxLeft () {
      return this.currentElementIndex === 0
    },
    reachedMaxRight () {
      return this.currentElementIndex === this.cards.length - 1
    }
  },
  methods: {
    showNextElement () {
      this.currentElementIndex++
    },
    showPrevElement () {
      this.currentElementIndex--
    },
    showElement (elementIndex) {
      this.currentElementIndex = elementIndex
    },
    handleKeydown (e) {
      switch (e.keyCode) {
        case 37:
          this.showPrevElement()
          break
        case 39:
          this.showNextElement()
          break
      }
    }
  },
  beforeMount () {
    window.addEventListener('keydown', this.handleKeydown, null)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKeydown)
  }
}
</script>

<style src="../assets/styles/Carousel.css" scoped/>
