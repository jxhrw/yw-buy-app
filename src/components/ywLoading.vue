<template>
    <div class="fullScreen" :class="{'show':loading}" :style="{'backgound':bgColor}">
        <div class="loading"></div>
    </div>
</template>
<script>
    export default{
        props:{
            loading:{
                type:Boolean,
                default:false
            },
            bgColor:{
                type:String,
                default:"none",
            }
        }
    }
</script>
<style scoped>
.fullScreen{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: none;
}
.fullScreen.show{
    display: block;
}
.loading{
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -0.5rem;
    margin-left: -.5rem;
    background-color: rgba(0,0,0,0.5);
}
</style>

