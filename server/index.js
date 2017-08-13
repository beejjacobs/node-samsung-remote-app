const express = require('express');
const samsung = require('node-samsung-remote');
const config = require('./config.json');
const app = express();

let remote = new samsung({ip: config.tv});
remote.debug = true;

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
  remote.volumeUp();
  res.sendStatus(200);
});

app.get('/volumeDown', function (req, res) {
  console.log('volumeDown');
  remote.volumeDown();
  res.sendStatus(200);
});

app.get('/mute', function (req, res) {
  console.log('mute');
  remote.mute();
  res.sendStatus(200);
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
  console.log('Example app listening on port 3000!');
});