<template>
<div id="app">
    <router-view class="chracter-view"></router-view>
    <neutrals></neutrals>
    <router-view name="content" :key="$route.fullPath"></router-view>
</div>
</template>

<script>
import Neutrals from './components/Neutrals.vue'

export default {
    name: 'app',
    components: {
        Neutrals
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 40px;
}
</style>

<style scoped>
.chracter-view {
    margin-bottom: 20px;
}
</style>
