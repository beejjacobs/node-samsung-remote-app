<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app" ref="touch">
    <div class="controls" v-if="!swipeView">
      <div id="channels">
        <img v-for="channel in channels"
             v-bind:src="'img/' + channel.img"
             @click="press('setChannel', channel.number)">
      </div>
      <md-theme md-name="blueGrey" id="keypad">
        <md-button v-for="key in [1,2,3,4,5,6,7,8,9,0]"
                   :key="key"
                   class="md-raised md-primary key"
                   @click="press('number', key)"
                   v-bind:class="{ middle: key === 0 }">
          {{ key }}
        </md-button>
      </md-theme>
      <div id="dpad">
        <md-button :class="dpadButton" @click="press('source')">Src</md-button>
        <md-button :class="dpadIcon" @click="press('arrow', 'up')">arrow_upward</md-button>
        <md-button :class="dpadButton" @click="press('guide')">Guide</md-button>
        <md-button :class="dpadIcon" @click="press('arrow', 'left')">arrow_back</md-button>
        <md-button :class="dpadIcon" @click="press('enter')">stop</md-button>
        <md-button :class="dpadIcon" @click="press('arrow', 'right')">arrow_forward</md-button>
        <md-button :class="dpadButton" @click="press('back')">Back</md-button>
        <md-button :class="dpadIcon" @click="press('arrow', 'down')">arrow_downward</md-button>
        <md-button :class="dpadButton" @click="press('exit')">Exit</md-button>
        <md-button class="middle key" :class="dpadIcon" @click="swipeView = true">touch_app</md-button>
      </div>
      <md-theme md-name="deepPurple" id="transport">
        <md-button v-for="transport in transports"
                   :key="transport.icon"
                   :class="iconButton"
                   @click="press('transport', transport.param)">
          {{ transport.icon }}
        </md-button>
      </md-theme>
      <div id="misc">
        <md-button id="volumeUp" :class="iconButton" @click="press('volumeUp')">volume_up</md-button>
        <md-button id="volumeDown" :class="iconButton" @click="press('volumeDown')">volume_down</md-button>
        <md-button id="mute" :class="iconButton" @click="press('mute')">volume_off</md-button>
        <md-button id="channelUp" :class="iconButton" @click="press('channelUp')">add</md-button>
        <md-button id="channelDown" :class="iconButton" @click="press('channelDown')">remove</md-button>
        <md-button id="hdmi" :class="iconButton" @click="press('hdmi')">settings_input_hdmi</md-button>
        <md-button id="tv" :class="iconButton" @click="press('tv')">tv</md-button>
        <md-button id="info" :class="iconButton" @click="press('info')">info_outline</md-button>
        <md-button id="tools" :class="iconButton" @click="press('tools')">build</md-button>
        <md-button id="menu" :class="iconButton" @click="press('menu')">menu</md-button>
        <img id="smartHub" src="img/smarthub.png" @click="press('smartHub')">
      </div>
    </div>
    <div v-else>
      <md-button class="md-fab md-fab-top-right" @click="swipeView = false">
        <md-icon>close</md-icon>
      </md-button>
      <md-icon class="touch-icon white md-size-4x">touch_app</md-icon>
      <md-icon v-if="swiping === 'up'" class="md-size-2x swipe up">arrow_upward</md-icon>
      <md-icon v-if="swiping === 'down'" class="md-size-2x swipe down">arrow_downward</md-icon>
      <md-icon v-if="swiping === 'left'" class="md-size-2x swipe left">arrow_back</md-icon>
      <md-icon v-if="swiping === 'right'" class="md-size-2x swipe right">arrow_forward</md-icon>
    </div>
  </div>
</template>

<script>
  import Hammer from './hammer';

export default {
  name: 'app',
  data () {
    return {
      swipeView: false,
      swiping: false,
      iconButton: 'md-icon-button md-raised md-primary icon',
      dpadIcon: 'md-raised md-accent dpad icon',
      dpadButton: 'md-raised md-primary dpad',
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
  mounted() {
    let h = new Hammer(this.$refs.touch);

    h.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    h.on('swipeleft swiperight swipeup swipedown tap press', ev => {
      if (!this.swipeView) {
        return;
      }
      switch (ev.type) {
        case 'swipeleft':
          this.swiping = 'left';
          this.press('arrow', 'left');
          break;
        case 'swiperight':
          this.swiping = 'right';
          this.press('arrow', 'right');
          break;
        case 'swipeup':
          this.swiping = 'up';
          this.press('arrow', 'up');
          break;
        case 'swipedown':
          this.swiping = 'down';
          this.press('arrow', 'down');
          break;
        case 'tap':
        case 'press':
          this.press('enter');
          break;
      }
      if (this.swiping) {
        setTimeout(() => {
          this.swiping = false;
        }, 500);
      }
    });
  },
  methods: {
    press: function(method, param) {
      console.log('press ' + method + ' ' + (param ? param : ''));
      let url = 'http://192.168.0.2:3000/' + method;
      if (typeof param !== 'undefined') {
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
    width: 100vw;
    height: 100vh;
    background-color: black;
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(6, 16.6vw);
    grid-template-rows: repeat(10, 10vh);
    width: 100vw;
    height: 100vh;
  }

  .white {
    color: white;
  }

  .touch-icon {
    position: absolute;
    top: calc(50% - 48px);
    left: calc(50% - 48px);
  }

  .swipe {
    position: absolute;
    color: #cecece;
  }

  .swipe.up {
    top: 24px;
    left: calc(50% - 24px);
  }
  .swipe.down {
    bottom: 24px;
    left: calc(50% - 24px);
  }
  .swipe.left {
    top: calc(50% - 24px);
    left: 24px;
  }
  .swipe.right {
    top: calc(50% - 24px);
    right: 24px;
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
    outline: 2px solid black;
    outline-offset: -2px;
  }
  #transport,
  #channels {
    justify-self: center;
    align-self: center;
  }
  #transport {
    grid-row: 10;
  }

  @media (max-width: 480px) {
    #transport .md-button.md-icon-button {
      margin: 0;
    }
  }

  #keypad {
    grid-column: 1 / 4;
    grid-row: 6 / 10;
  }

  #dpad {
    grid-column: 4 / 7;
    grid-row: 6 / 10;
  }

  #misc {
    display: grid;
    grid-row: 2 / 6;
    grid-template-columns: repeat(5, 18vw);
    grid-template-rows: repeat(3, 10vh);
    width: 90vw;
    align-self: center;
    justify-self: center;
    align-items: center;
    justify-items: center;
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
  #smartHub {
    max-width: 60px;
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
