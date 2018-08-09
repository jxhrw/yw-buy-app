<template>
  <div class="fullScreen" :class="{'show':loading}" :style="{'backgound':bgColor}">
    <div class="loading" :style="{'background-image':'url('+iconLoading+')'}"></div>
  </div>
</template>
<script>
  import iconLoading from '@/assets/imgs/loading.gif'
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      bgColor: {
        type: String,
        default: "none",
      }
    },
    data() {
      return {
        iconLoading: iconLoading,
      }
    }
  }

</script>
<style scoped>
  .fullScreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: none;
  }

  .fullScreen.show {
    display: block;
  }

  .loading {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -0.5rem;
    margin-left: -.5rem;
    background: rgba(0, 0, 0, 0.5) url() no-repeat center/50% 50%;
    border-radius: 0.1rem;
  }

</style>
