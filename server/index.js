const express = require('express');
const samsung = require('node-samsung-remote');
const config = require('./config.json');
const { Sonos } = require('sonos');
const io = require('socket.io')(3003);
const app = express();

let remote = new samsung({ip: config.tv});
remote.debug = true;

let soundBar = new Sonos(config.sonos);

soundBar.on('Volume', volume => {
  console.log('volume change', volume);
  io.emit('volume', volume);
});
soundBar.on('Muted', muted => {
  console.log('mute change', muted)
  io.emit('mute', muted);
});

io.on('connection', function (socket) {
  console.log('client connected');
  soundBar.getMuted()
      .then(muted => socket.emit('mute', muted))
      .catch(err => console.error('error getting mute state', err));
  soundBar.getVolume()
      .then(volume => socket.emit('volume', volume))
      .catch(err => console.error('error getting volume state', err));
  socket.on('changeVolume', volume => {
    console.log('changeVolume', volume);
    if (volume >= 0 && volume <= 100) {
      soundBar.setVolume(volume)
          .catch(err => console.error('error setting volume', err));
    }
  });
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res) {
  console.log('/');
  res.sendStatus(200);
});

app.get('/source', function (req, res) {
  console.log('source');
  remote.source();
  res.sendStatus(200);
});

app.get('/setChannel/:channel', function (req, res) {
  console.log('setChannel', req.params);
  remote.setChannel(req.params.channel);
  res.sendStatus(200);
});

app.get('/number/:number', function (req, res) {
  console.log('number', req.params);
  remote.number(req.params.number);
  res.sendStatus(200);
});

app.get('/volumeUp', function (req, res) {
  console.log('volumeUp');
  let newVolume;
  soundBar.getVolume()
      .then(volume => {
        newVolume = volume + 4;
        if (newVolume > 100) {
          newVolume = 100;
        }
        return soundBar.setVolume(newVolume);
      })
      .then(() => {
        io.emit('volume', newVolume);
        res.sendStatus(200);
      })
      .catch(err => console.error('error setting volume', err));
});

app.get('/volumeDown', function (req, res) {
  console.log('volumeDown');
  let newVolume;
  soundBar.getVolume()
      .then(volume => {
        newVolume = volume - 4;
        if (newVolume < 0) {
          newVolume = 0;
        }
        return soundBar.setVolume(newVolume);
      })
      .then(() => {
        io.emit('volume', newVolume);
        res.sendStatus(200);
      })
      .catch(err => console.error('error setting volume', err));
});

app.get('/mute', function (req, res) {
  console.log('mute');
  let newState;
  soundBar.getMuted()
      .then(muted => {
        newState = !muted;
        return soundBar.setMuted(newState);
      })
      .then(() => {
        io.emit('mute', newState);
        res.sendStatus(200);
      })
      .catch(err => console.error('error setting mute', err));
});

app.get('/channelUp', function (req, res) {
  console.log('channelUp');
  remote.channelUp();
  res.sendStatus(200);
});

app.get('/channelDown', function (req, res) {
  console.log('channelDown');
  remote.channelDown();
  res.sendStatus(200);
});

app.get('/previousChannel', function (req, res) {
  console.log('previousChannel');
  remote.previousChannel();
  res.sendStatus(200);
});

app.get('/arrow/:direction', function (req, res) {
  console.log('arrow ' + req.params.direction);
  remote.arrow(req.params.direction);
  res.sendStatus(200);
});

app.get('/smartHub', function (req, res) {
  console.log('smartHub');
  remote.smartHub();
  res.sendStatus(200);
});

app.get('/menu', function (req, res) {
  console.log('menu');
  remote.menu();
  res.sendStatus(200);
});

app.get('/guide', function (req, res) {
  console.log('guide');
  remote.guide();
  res.sendStatus(200);
});

app.get('/tools', function (req, res) {
  console.log('tools');
  remote.tools();
  res.sendStatus(200);
});

app.get('/info', function (req, res) {
  console.log('info');
  remote.info();
  res.sendStatus(200);
});

app.get('/back', function (req, res) {
  console.log('back');
  remote.back();
  res.sendStatus(200);
});

app.get('/exit', function (req, res) {
  console.log('exit');
  remote.exit();
  res.sendStatus(200);
});

app.get('/enter', function (req, res) {
  console.log('enter');
  remote.enter();
  res.sendStatus(200);
});

app.get('/colour/:colour', function (req, res) {
  console.log('colour ' + req.params.colour);
  remote.colour(req.params.colour);
  res.sendStatus(200);
});

app.get('/transport/:command', function (req, res) {
  console.log('transport ' + req.params.command);
  remote.transport(req.params.command);
  res.sendStatus(200);
});

app.get('/tv', function (req, res) {
  console.log('tv');
  remote.tv();
  res.sendStatus(200);
});

app.get('/hdmi', function (req, res) {
  console.log('hdmi');
  remote.hdmi();
  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
