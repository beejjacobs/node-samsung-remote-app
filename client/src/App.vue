<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app">
    <md-tabs md-fixed :md-dynamic-height='false'>
      <md-tab v-for="group in groups" :key="group.id" v-bind:id="group.id" v-bind:md-label="group.name">
        <md-button v-for="button in group.buttons"
                   :key="button.title"
                   v-on:click="press(button)"
                   class="md-raised md-primary"
                   v-bind:class="[button.classes]">
          {{ button.title }}
        </md-button>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      groups: [
        {
          id: 'control',
          name: 'Control',
          buttons: [
            { title: 'Source', method: 'source' },
            { title: 'Vol Up', method: 'volumeUp' },
            { title: 'Vol Down', method: 'volumeDown' },
            { title: 'Mute', method: 'mute' },
            { title: 'Channel Up', method: 'channelUp' },
            { title: 'Channel Down', method: 'channelDown' },
            { title: 'Back', method: 'back' },
            { title: 'Exit', method: 'exit' },
            { title: 'Smart Hub', method: 'smartHub' },
            { title: 'play_arrow', method: 'transport', param: 'play' , classes: 'icon'},
            { title: 'pause', method: 'transport', param: 'pause' , classes: 'icon'},
            { title: 'stop', method: 'transport', param: 'stop' , classes: 'icon'},
            { title: 'fast_forward', method: 'transport', param: 'forward' , classes: 'icon'},
            { title: 'fast_rewind', method: 'transport', param: 'backward', classes: 'icon' }
          ]
        },
        {
          id: 'channels',
          name: 'Channels',
          buttons: [
            { title: 'BBC One HD', method: 'setChannel', param: '101' },
            { title: 'BBC Two HD', method: 'setChannel', param: '102' },
            { title: 'ITV HD', method: 'setChannel', param: '103' },
            { title: 'Channel 4 HD', method: 'setChannel', param: '104' }
          ]
        },
        {
          id: 'keypad',
          name: 'Keypad',
          buttons: [
            { title: '1', method: 'number', param: '1', classes: 'key md-accent' },
            { title: '2', method: 'number', param: '2', classes: 'key md-accent' },
            { title: '3', method: 'number', param: '3', classes: 'key md-accent' },
            { title: '4', method: 'number', param: '4', classes: 'key md-accent' },
            { title: '5', method: 'number', param: '5', classes: 'key md-accent' },
            { title: '6', method: 'number', param: '6', classes: 'key md-accent' },
            { title: '7', method: 'number', param: '7', classes: 'key md-accent' },
            { title: '8', method: 'number', param: '8', classes: 'key md-accent' },
            { title: '9', method: 'number', param: '9', classes: 'key md-accent' },
            { title: '0', method: 'number', param: '0', classes: 'key middle md-accent' }
          ]
        },
        {
          id: 'dpad',
          name: 'DPad',
          buttons: [
            { title: 'arrow_upward', method: 'arrow', param: 'up', classes: 'dpad middle clear' },
            { title: 'arrow_back', method: 'arrow', param: 'left', classes: 'dpad' },
            { title: 'stop', method: 'enter', classes: 'dpad' },
            { title: 'arrow_forward', method: 'arrow', param: 'right', classes: 'dpad' },
            { title: 'arrow_downward', method: 'arrow', param: 'down', classes: 'dpad middle' }
          ]
        }
      ]
    }
  },
  methods: {
    press: function(data) {
      console.log('press ' + data);
      var url = 'http://192.168.0.2:3000/' + data.method;
      if (data.param) {
        url += '/' + data.param;
      }
      this.$http.get(url).then(console.log);
    }
  }
}


</script>

<style>
  .key {
    width: 25%;
    font-size: 4em;
    line-height: 2em;
  }
  .key.middle {
    margin-left: calc(25% + 24px);
  }
  .dpad {
    width: 25%;
    line-height: 2em;
    font-size: 4em;

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
  .dpad.middle {
    margin-left: calc(25% + 24px);
  }
  .dpad.clear {
    display: block;
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
