<template>
  <div id="app">
    <router-view tag="div" id="mainView"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

#mainView{
  position: absolute;
  width: 100vmin;
  top: 0;
}
</style>
