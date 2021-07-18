<template>
  <div class='container'>
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      gutter: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;

    &.-with-gutter {
      max-width: 1224px;
      padding-left: 20px;
      padding-right: 20px;

      @media (min-width: 900px) {
        padding-left: 24px;
        padding-right: 24px;
      }
    }
  }
</style>
