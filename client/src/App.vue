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
      <md-button class="md-raised md-primary dpad" v-on:click="press('source')">Source</md-button>
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
      <md-button class="md-raised md-primary icon" v-on:click="press('volumeUp')">volume_up</md-button>
      <md-button class="md-raised md-primary icon" v-on:click="press('volumeDown')">volume_down</md-button>
      <md-button class="md-raised md-primary icon" v-on:click="press('mute')">volume_off</md-button>
      <md-button class="md-raised md-primary" v-on:click="press('channelUp')">Chn +</md-button>
      <md-button class="md-raised md-primary" v-on:click="press('channelDown')">Chn -</md-button>
      <md-button class="md-icon-button md-raised md-primary icon" v-on:click="press('hdmi')">settings_input_hdmi</md-button>
      <md-button class="md-icon-button md-raised md-primary icon" v-on:click="press('tv')">tv</md-button>
      <md-button class="md-icon-button md-raised md-primary icon" v-on:click="press('info')">info_outline</md-button>
      <md-button class="md-icon-button md-raised md-primary icon" v-on:click="press('tools')">build</md-button>
      <md-button class="md-raised md-primary" v-on:click="press('menu')">Menu</md-button>

      <img src="img/SmartTV.svg" class="smarthub" v-on:click="press('smartHub')">
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
    grid-template-columns: repeat(3, 16.6vw);
    grid-row: 2 / 5;
  }

  #channels {
    grid-row: 1;
  }

  #keypad {
    grid-column: 1 / 4;
  }

  #dpad {
    grid-column: 4 / 7;
  }

  #transport {
    grid-row: 6;
  }

  #misc {
    grid-row: 7 / 10;
  }

  .key {
    width: 90%;
  }
  .key.middle {
    grid-column: 2;
  }
  .dpad {
    width: 90%;
    /*height: 25vw;*/
  }
  .dpad.icon {
    /*line-height: 25vw;*/
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

  .smarthub {
    height: auto;
    max-width: 80px;
  }

  #channels {
    max-height: 60px;
  }
  #channels img {
    max-width: 24vw;
  }

  .md-button.md-icon-button {
    width: 55px;
    height: 55px;
    margin: 0 6px;
    font-size: 2em;
  }

  #transport,
  #channels {
    text-align: center;
  }
</style>
