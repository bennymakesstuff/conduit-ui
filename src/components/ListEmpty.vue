<template>
  <div class="empty-badge">
    <div>
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListEmpty',
  props: {
    label: {
      default: 'Empty',
      type: String
    },
  }
}
</script>

<style lang="scss" scoped>
.empty-badge {
  margin: 2rem auto;
  border: 1px solid var(--bg-opposite);
  text-align: center;
  padding: 1rem 2rem;
  max-width: 20rem;
  color: var(--bg-opposite);
  border-radius: 0.25rem;

  > div {
    font-size: 1.1rem;
  }
}
</style>
