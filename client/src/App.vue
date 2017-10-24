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
  .key {
    width: 25vw;
    height: 25vw;
    font-size: 4em;
    line-height: 25vw;
  }
  .key.middle {
    margin-left: calc(25% + 24px);
  }
  .dpad {
    width: 25vw;
    height: 25vw;
  }
  .dpad.icon {
    line-height: 25vw;
    font-size: 4em;
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

  #channels img {
    max-width: 25vw;
  }

  #transport {
    text-align: center;
  }
</style>
