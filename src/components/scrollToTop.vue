<template>
  <div class="backTop" v-if='scTop'></div>
</template>
<script>
  export default {
    props: {
      scTop:{
          type:Boolean,
          default:false
      }
    },
    methods: {
      
    }
  }

</script>
<style scoped>
  .backTop {
    width: 1rem;
    height: 1rem;
    background: rgba(0, 0, 0, 0.9);
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 1;
  }

</style>
