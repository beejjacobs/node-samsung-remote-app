<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app">
    <div id="channels">
      <img v-for="channel in channels"
            v-bind:src="'img/' + channel.img"
            v-on:click="press('setChannel', channel.number)">
    </div>
    <div id="keypad">
      <md-button v-for="key in [1,2,3,4,5,6,7,8,9,0]"
                 :key="key"
                 class="md-raised md-accent key"
                 v-on:click="press('number', key)"
                 v-bind:class="{ middle: key === 0 }">
        {{ key }}
      </md-button>
    </div>
    <div id="dpad">
      <md-button class="md-raised md-primary dpad" v-on:click="press('source')">Src</md-button>
      <md-button class="md-raised md-accent dpad icon" v-on:click="press('arrow', 'up')">arrow_upward</md-button>
      <md-button class="md-raised md-primary dpad" v-on:click="press('guide')">Guide</md-button>
      <md-button class="md-raised md-accent dpad icon" v-on:click="press('arrow', 'left')">arrow_back</md-button>
      <md-button class="md-raised md-accent dpad icon" v-on:click="press('enter')">stop</md-button>
      <md-button class="md-raised md-accent dpad icon" v-on:click="press('arrow', 'right')">arrow_forward</md-button>
      <md-button class="md-raised md-primary dpad" v-on:click="press('back')">Back</md-button>
      <md-button class="md-raised md-accent dpad icon" v-on:click="press('arrow', 'down')">arrow_downward</md-button>
      <md-button class="md-raised md-primary dpad" v-on:click="press('exit')">Exit</md-button>
    </div>
    <div id="transport">
      <md-button v-for="transport in transports"
                 :key="transport.icon"
                 class="md-icon-button md-raised md-accent icon"
                 v-on:click="press('transport', transport.param)">
        {{ transport.icon }}
      </md-button>
    </div>
    <div id="misc">
      <md-button id="volumeUp" class="md-icon-button md-raised md-primary icon" v-on:click="press('volumeUp')">volume_up</md-button>
      <md-button id="volumeDown" class="md-icon-button md-raised md-primary icon" v-on:click="press('volumeDown')">volume_down</md-button>
      <md-button id="mute" class="md-icon-button md-raised md-primary icon" v-on:click="press('mute')">volume_off</md-button>
      <md-button id="channelUp" class="md-raised md-primary" v-on:click="press('channelUp')">Chn +</md-button>
      <md-button id="channelDown" class="md-raised md-primary" v-on:click="press('channelDown')">Chn -</md-button>
      <md-button id="hdmi" class="md-icon-button md-raised md-primary icon" v-on:click="press('hdmi')">settings_input_hdmi</md-button>
      <md-button id="tv" class="md-icon-button md-raised md-primary icon" v-on:click="press('tv')">tv</md-button>
      <md-button id="info" class="md-icon-button md-raised md-primary icon" v-on:click="press('info')">info_outline</md-button>
      <md-button id="tools" class="md-icon-button md-raised md-primary icon" v-on:click="press('tools')">build</md-button>
      <md-button id="menu" class="md-raised md-primary" v-on:click="press('menu')">Menu</md-button>
      <img id="smarthub" src="img/SmartTV.svg" v-on:click="press('smartHub')">
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      channels: [
        {img: 'bbconehd.png', number: '101'},
        {img: 'bbctwohd.png', number: '102'},
        {img: 'itvhd.png', number: '103'},
        {img: 'channel4hd.png', number: '104'}
      ],
      transports: [
        { icon: 'skip_previous', param: 'skip-backward'},
        { icon: 'fast_rewind', param: 'backward'},
        { icon: 'play_arrow', param: 'play'},
        { icon: 'pause', param: 'pause'},
        { icon: 'stop', param: 'stop'},
        { icon: 'fast_forward', param: 'forward'},
        { icon: 'skip_next', param: 'skip-forward'}
      ]
    }
  },
  methods: {
    press: function(method, param) {
      console.log('press ' + method + ' ' + param);
      let url = 'http://192.168.0.2:3000/' + method;
      if (param) {
        url += '/' + param;
      }
      this.$http.get(url).then(console.log);
    }
  }
}


</script>

<style>
  .md-button {
    min-width: unset;
    min-height: unset;
    padding: 0;
  }
  .md-button.md-icon-button {
    width: 55px;
    height: 55px;
    margin: 0 6px;
    font-size: 2em;
  }

  #app {
    display: grid;
    grid-template-columns: repeat(6, 16.6vw);
    grid-template-rows: repeat(10, 10vh);
    width: 100vw;
    height: 100vh;
  }

  #channels,
  #transport,
  #misc {
    grid-column: span 6;
  }

  #keypad,
  #dpad {
    display: grid;
    grid-template-columns: repeat(3, 16vw);
  }

  #channels {
    grid-row: 1;
  }
  #channels img {
    max-width: 24vw;
  }
  #transport,
  #channels {
    text-align: center;
  }
  #transport {
    grid-row: 10;
  }

  #keypad {
    grid-column: 1 / 4;
    grid-row: 6 / 10;
  }

  #dpad {
    grid-column: 4 / 7;
    grid-row: 6 / 9;
  }

  #misc {
    display: grid;
    grid-row: 2 / 5;
    grid-template-columns: repeat(5, 20vw);
    grid-template-rows: repeat(3, 20vw);
  }
  #volumeUp {
    grid-area: 1 / 1;
  }
  #volumeDown {
    grid-area: 2 / 1;
  }
  #mute {
    grid-area: 3 / 1;
  }
  #tv {
    grid-area: 1 / 2;
  }
  #hdmi {
    grid-area: 1 / 4;
  }
  #info {
    grid-area: 3 / 4;
  }
  #tools {
    grid-area: 3 / 2;
  }
  #smarthub {
    height: auto;
    max-width: 80px;
    grid-area: 2 / 3;
  }
  #channelUp {
    grid-area: 1 / 5;
  }
  #channelDown {
    grid-area: 2 / 5;
  }
  #menu {
    grid-area: 3 / 5;
  }

  #channelUp,
  #channelDown,
  #menu {
    width: 55px;
    height: 55px;
    margin: 0 6px;
  }

  .key {
    width: 90%;
    font-size: 2em;
  }
  .key.middle {
    grid-column: 2;
  }
  .dpad {
    width: 90%;
  }
  .dpad.icon {
    font-size: 2em;
  }
  .icon {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
</style>
