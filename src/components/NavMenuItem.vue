<template>
  <div class="nav-item">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'NavMenuItem',
  props: {
    title: {
      default: 'No Title',
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-item {
  width: 100%;
  height: 5.5rem;
  line-height: 6rem;
  text-align: center;
  border-bottom: 1px solid #373144;
  cursor: pointer;
}

.nav-item:hover {background-color: rgba(255,255,255,0.05);}
</style>
