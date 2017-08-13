<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app">
    <h1>{{ msg }}</h1>
    <button v-for="button in buttons" v-on:click="press(button)">
      {{ button.title }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Samsung Remote',
      buttons: [
        { title: 'Source', method: 'source' },
        { title: 'Vol Up', method: 'volumeUp' },
        { title: 'Vol Down', method: 'volumeDown' },
        { title: 'Mute', method: 'mute' },
        { title: 'Up', method: 'arrow', param: 'up' },
        { title: 'Down', method: 'arrow', param: 'down' },
        { title: 'Left', method: 'arrow', param: 'left' },
        { title: 'Right', method: 'arrow', param: 'right' },
        { title: 'Enter', method: 'enter' },
        { title: 'Back', method: 'back' },
        { title: 'Exit', method: 'exit' },
        { title: 'Smart Hub', method: 'smartHub' },
        { title: 'BBC One HD', method: 'setChannel', param: '101' },
        { title: 'BBC Two HD', method: 'setChannel', param: '102' },
        { title: 'ITV HD', method: 'setChannel', param: '103' },
        { title: 'Channel 4 HD', method: 'setChannel', param: '104' }
      ]
    }
  },
  methods: {
    press: function(data) {
      console.log('press ' + data);
      var url = 'http://192.168.0.110:3000/' + data.method;
      if (data.param) {
        url += '/' + data.param;
      }
      this.$http.get(url)
        .then(response => {
          console.log(response);
        }, response => {
          // error callback
        });
    }
  }
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  float: left;
  height: 5em;
  min-width: 45%;
  font-size: 3em;
  margin: 20px;
}

</style>
