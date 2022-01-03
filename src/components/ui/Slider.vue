<template>
  <div>
    <div class="track">
      <div class="ball"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Slider',
  components: {
  },
  data: function() {
    return {
    }
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    units: {
      type: String,
      default: ''
    },
    increment: {
      type: Number,
      default: 5
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.track {
  width: 100%;
  height: 5px;
  background-color: rgb(31, 25, 52);
  border-radius: 3px;
}

.ball {
  background-color: blue;
  width: 20px;
  height: 20px;
  cursor: grab;
  margin-left: -10px;
  transform: translateY(calc(-50% + 2px));
  border-radius: 10px;
}

.ball:active {cursor:grabbing}
</style>
