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
    background: url('../assets/imgs/iv_move_to_top.png') no-repeat center/contain;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 1;
  }

</style>
