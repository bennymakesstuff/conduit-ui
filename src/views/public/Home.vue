<template>
  <div class="home-page">

    <div class="home-area">

      <h1>{{ home_page_title }}</h1>

    </div>

  </div>
</template>

<script>

export default {
  name: 'HomePage',
  components: {

  },
  data: function() {
    return {
      home_page_title: 'Conduit Template Application'
    }
  },
  props: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.home-page {
  display: flex;
  width: 100%;
  height: calc(100vh - 4rem);

  > .home-area {
    flex: 1;
    width: auto;
    min-width: 30rem;
    max-width: 40rem;
    margin: auto;
    padding: 2rem;
    text-align: center;
    transform: translateY(-2rem);
  }
}

.navigation {
  width: 100vw;
  text-align: left;
  color: #ffffff;
  height: 4rem;
  box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.1);

  .login {
    float: right;
    margin-top: 0.5rem;
    margin-right: 1rem;
    height: 3rem;
  }
}
</style>
