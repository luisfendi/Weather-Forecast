<template>
    <div class="load"></div>
</template>


<script>
    export default{

    }
</script>


<style lang="less" scoped>
    @keyframes donut-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
    .load {
    display: inline-block;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #7983ff;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    animation: donut-spin 1.2s linear infinite;

    position: absolute;
    top: 20vh;
    left: calc(50vw - 15px)
    }
</style>