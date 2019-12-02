<template>
  <div id="app11">
    <!--<img src="./assets/logo.png">-->
    <div>
      <router-link to="/HelloWord">go to hello</router-link>
      <router-link to="/Demo">go to demo</router-link>
      <router-link to="/NamesRules">NameRules</router-link>
      <router-link to="/NumberGame">NumberGame</router-link>
      <router-link to="/Particles">Particles</router-link>
    </div>
    <router-view></router-view>
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
