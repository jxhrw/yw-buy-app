<template>
  <div id="about">
    <ywBar :title="'关于我们'" style="border-bottom:1px solid #e6e6e6;background: #fff;"></ywBar>
    <div class="content">
      <div class="flex">
        <div class="icon"></div>
        <h6>有表商家版</h6>
        <h6>v1.0.0</h6>
      </div>
      <ul class="list">
        <li @click="goPolicy">
          隐私政策
          <mu-icon class="icon_right" value="chevron_right"></mu-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      goPolicy(){
        this.$router.push({
          path: '/policy'
        });
      }
    },
    mounted() {

    },
    activated() {

    },
  };

</script>

<style scoped>
  #about {
    background: #ffffff;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0.9rem 0.3rem 0.5rem 0.3rem;
  }

  .flex {
    text-align: center;
  }

  .flex .icon {
    background: #f5f6f6;
    width: 1.50rem;
    height: 1.50rem;
    margin: 0.6rem auto 0.23rem auto;
  }

  .flex h6 {
    font-size: .28rem;
    color: #333333;
    line-height: .4rem;
    font-weight: normal;
    padding: .05rem 0;
  }

  .list {
    margin-top: .55rem;
    list-style: none;
    padding: 0;
    border-top: 1px solid #e6e6e6;
  }

  .list li {
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .9rem;
    font-size: .28rem;
    color: #333333;
  }

  .icon_right {
    color: #cccccc;
    font-size: .50rem;
    margin-right: -0.15rem;
  }

</style>
