/*
 * Noel Delgado | @pixelia_me
 *
 * Music by Term and Conditions Mixes
 * https://soundcloud.com/term-and-conditions-mixes/new-year-dubstep-minimix
 */

import React from "react";

export default class BackgroundVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.media = [
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/new_year_dubstep_minimix.ogg"
    ];
    this.fftSize = 1024;
    // [32, 64, 128, 256, 512, 1024, 2048]

    this.ackground_color = "rgba(0, 0, 1, 1)";
    this.background_gradient_color_1 = "#000011";
    this.background_gradient_color_2 = "#060D1F";
    this.background_gradient_color_3 = "#02243F";

    this.stars_color = "#465677";
    this.stars_color_2 = "#B5BFD4";
    this.stars_color_special = "#F451BA";
    this.TOTAL_STARS = 1500;
    this.STARS_BREAK_POINT = 140;
    this.stars = [];

    this.waveform_color = "rgba(29, 36, 57, 0.05)";
    this.waveform_color_2 = "rgba(0,0,0,0)";
    this.waveform_line_color = "rgba(157, 242, 157, 0.11)";
    this.waveform_line_color_2 = "rgba(157, 242, 157, 0.8)";
    this.waveform_tick = 0.05;
    this.TOTAL_POINTS = this.fftSize / 2;
    this.points = [];

    this.bubble_avg_color = "rgba(29, 36, 57, 0.1)";
    this.bubble_avg_color_2 = "rgba(29, 36, 57, 0.05)";
    this.bubble_avg_line_color = "rgba(77, 218, 248, 1)";
    this.bubble_avg_line_color_2 = "rgba(77, 218, 248, 1)";
    this.bubble_avg_tick = 0.001;
    this.TOTAL_AVG_POINTS = 64;
    this.AVG_BREAK_POINT = 100;
    this.avg_points = [];

    this.SHOW_STAR_FIELD = true;
    this.SHOW_WAVEFORM = true;
    this.SHOW_AVERAGE = true;

    this.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.floor = Math.floor;
    this.round = Math.round;
    this.random = Math.random;
    this.sin = Math.sin;
    this.cos = Math.cos;
    this.PI = Math.PI;
    this.PI_TWO = this.PI * 2;
    this.PI_HALF = this.PI / 180;

    this.w = 0;
    this.h = 0;
    this.cx = 0;
    this.cy = 0;

    this.playing = false;
    this.startedAt = {};
    this.pausedAt = {};

    this.rotation = 0;
    //this.msgElement = document.querySelector("#loading .msg");
    this.avg = {};
    this.ctx = {};
    this.actx = {};
    this.asource = {};
    this.gainNode = {};
    this.analyser = {};
    this.frequencyData = {};
    this.frequencyDataLength = {};
    this.timeData = {};

    window.addEventListener("load", this.initialize, false);
    window.addEventListener("resize", this.resizeHandler, false);

    this.featureNotSupported = this.featureNotSupported.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.initializeAudio = this.initializeAudio.bind(this);
    this.createAudioControls = this.createAudioControls.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.drawStarField = this.drawStarField.bind(this);
    this.drawAverageCircle = this.drawAverageCircle.bind(this);
    this.drawWaveform = this.drawWaveform.bind(this);
    this.animate = this.animate.bind(this);

    this.createStarField = this.createStarField.bind(this);

    this.createPoints = this.createPoints.bind(this);
    this.updateLoadingMessage = this.updateLoadingMessage.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  attachAnalyser(analyser, audioContext) {
    debugger;
    this.actx = audioContext;
    if (!AudioContext) {
      return this.featureNotSupported();
    }

    this.canvas = document.createElement("canvas");
    //this.canvas.style.zIndex = "-200";
    //this.canvas.style.position = "absolute";
    this.canvas.style.marginTop = "-418px";

    this.ctx = this.canvas.getContext("2d");

    this.analyser = analyser;

    //document.body.appendChild(this.ctx.canvas);

    document.getElementById("out").appendChild(this.ctx.canvas);

    this.resizeHandler();
    this.initializeAudio();
  }

  featureNotSupported() {
    this.hideLoader();
    //return (document.getElementById("no-audio").style.display = "block");
  }

  hideLoader() {
    // return (document.getElementById("loading").className = "hide");
  }

  updateLoadingMessage(text) {
    // this.msgElement.textContent = text;
  }

  initializeAudio() {
    this.analyser.fftSize = this.fftSize;
    this.analyser.minDecibels = -100;
    this.analyser.maxDecibels = -30;
    this.analyser.smoothingTimeConstant = 0.8;

    this.gainNode = this.actx.createGain();

    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.actx.destination);

    this.frequencyDataLength = this.analyser.frequencyBinCount;
    this.frequencyData = new Uint8Array(this.frequencyDataLength);
    this.timeData = new Uint8Array(this.frequencyDataLength);

    this.createStarField();
    this.createPoints();
    this.createAudioControls();
  }

  createAudioControls() {
    this.playAudio();
    this.hideLoader();
  }

  toggleAudio() {
    this.playing ? this.pauseAudio() : this.playAudio();
  }

  playAudio() {
    this.playing = true;
    // this.startedAt = this.pausedAt ? Date.now() - this.pausedAt : Date.now();
    // this.asource = null;
    // this.asource = this.actx.createBufferSource();
    // this.asource.buffer = this.audio_buffer;
    // this.asource.loop = true;
    // this.asource.connect(this.gainNode);
    // this.pausedAt
    //   ? this.asource.start(0, this.pausedAt / 1000)
    //   : this.asource.start();

    this.animate();
  }

  pauseAudio() {
    this.playing = false;
    this.pausedAt = Date.now() - this.startedAt;
    this.asource.stop();
  }

  getAvg(values) {
    var value = 0;

    values.forEach(v => {
      value += v;
    });

    return value / values.length;
  }

  clearCanvas() {
    var gradient = this.ctx.createLinearGradient(0, 0, 0, this.h);

    gradient.addColorStop(0, this.background_gradient_color_1);
    gradient.addColorStop(0.96, this.background_gradient_color_2);
    gradient.addColorStop(1, this.background_gradient_color_3);

    this.ctx.beginPath();
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.ctx.fill();
    this.ctx.closePath();

    gradient = null;
  }

  drawStarField() {
    var i, len, p, tick;

    for (i = 0, len = this.stars.length; i < len; i++) {
      p = this.stars[i];
      tick = this.avg > this.AVG_BREAK_POINT ? this.avg / 20 : this.avg / 50;
      p.x += p.dx * tick;
      p.y += p.dy * tick;
      p.z += p.dz;

      p.dx += p.ddx;
      p.dy += p.ddy;
      p.radius = 0.2 + (p.max_depth - p.z) * 0.1;

      if (p.x < -this.cx || p.x > this.cx || p.y < -this.cy || p.y > this.cy) {
        this.stars[i] = new Star(this);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.globalCompositeOperation = "lighter";
      this.ctx.fillStyle = p.color;
      this.ctx.arc(p.x + this.cx, p.y + this.cy, p.radius, this.PI_TWO, false);
      this.ctx.fill();
      this.ctx.closePath();
    }

    i = len = p = tick = null;
  }

  drawAverageCircle() {
    var i, len, p, value, xc, yc;

    if (this.avg > this.AVG_BREAK_POINT) {
      this.rotation += -this.bubble_avg_tick;
      value = this.avg + this.random() * 10;
      this.ctx.strokeStyle = this.bubble_avg_line_color_2;
      this.ctx.fillStyle = this.bubble_avg_color_2;
    } else {
      this.rotation += this.bubble_avg_tick;
      value = this.avg;
      this.ctx.strokeStyle = this.bubble_avg_line_color;
      this.ctx.fillStyle = this.bubble_avg_color;
    }

    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "round";

    this.ctx.save();
    this.ctx.translate(this.cx, this.cy);
    this.ctx.rotate(this.rotation);
    this.ctx.translate(-this.cx, -this.cy);

    this.ctx.moveTo(this.avg_points[0].dx, this.avg_points[0].dy);

    for (i = 0, len = this.TOTAL_AVG_POINTS; i < len - 1; i++) {
      p = this.avg_points[i];
      p.dx = p.x + value * this.sin(this.PI_HALF * p.angle);
      p.dy = p.y + value * this.cos(this.PI_HALF * p.angle);
      xc = (p.dx + this.avg_points[i + 1].dx) / 2;
      yc = (p.dy + this.avg_points[i + 1].dy) / 2;

      this.ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
    }

    p = this.avg_points[i];
    p.dx = p.x + value * this.sin(this.PI_HALF * p.angle);
    p.dy = p.y + value * this.cos(this.PI_HALF * p.angle);
    xc = (p.dx + this.avg_points[0].dx) / 2;
    yc = (p.dy + this.avg_points[0].dy) / 2;

    this.ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
    this.ctx.quadraticCurveTo(
      xc,
      yc,
      this.avg_points[0].dx,
      this.avg_points[0].dy
    );

    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
    this.ctx.closePath();

    i = len = p = value = xc = yc = null;
  }

  drawWaveform() {
    var i, len, p, value, xc, yc;

    if (this.avg > this.AVG_BREAK_POINT) {
      this.rotation += this.waveform_tick;
      this.ctx.strokeStyle = this.waveform_line_color_2;
      this.ctx.fillStyle = this.waveform_color_2;
    } else {
      this.rotation += -this.waveform_tick;
      this.ctx.strokeStyle = this.waveform_line_color;
      this.ctx.fillStyle = this.waveform_color;
    }

    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "round";

    this.ctx.save();
    this.ctx.translate(this.cx, this.cy);
    this.ctx.rotate(this.rotation);
    this.ctx.translate(-this.cx, -this.cy);

    this.ctx.moveTo(this.points[0].dx, this.points[0].dy);

    for (i = 0, len = this.TOTAL_POINTS; i < len - 1; i++) {
      p = this.points[i];
      value = this.timeData[i];
      p.dx = p.x + value * this.sin(this.PI_HALF * p.angle);
      p.dy = p.y + value * this.cos(this.PI_HALF * p.angle);
      xc = (p.dx + this.points[i + 1].dx) / 2;
      yc = (p.dy + this.points[i + 1].dy) / 2;

      this.ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
    }

    value = this.timeData[i];
    p = this.points[i];
    p.dx = p.x + value * this.sin(this.PI_HALF * p.angle);
    p.dy = p.y + value * this.cos(this.PI_HALF * p.angle);
    xc = (p.dx + this.points[0].dx) / 2;
    yc = (p.dy + this.points[0].dy) / 2;

    this.ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
    this.ctx.quadraticCurveTo(xc, yc, this.points[0].dx, this.points[0].dy);

    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
    this.ctx.closePath();

    i = len = p = value = xc = yc = null;
  }

  animate() {
    if (!this.playing) return;

    window.requestAnimationFrame(this.animate);
    this.analyser.getByteFrequencyData(this.frequencyData);
    this.analyser.getByteTimeDomainData(this.timeData);
    this.avg =
      this.getAvg([].slice.call(this.frequencyData)) * this.gainNode.gain.value;

    this.clearCanvas();

    if (this.SHOW_STAR_FIELD) {
      this.drawStarField();
    }

    if (this.SHOW_AVERAGE) {
      this.drawAverageCircle();
    }

    if (this.SHOW_WAVEFORM) {
      this.drawWaveform();
    }
  }

  createStarField() {
    var i = -1;

    while (++i < this.TOTAL_STARS) {
      this.stars.push(new Star(this));
    }

    i = null;
  }

  createPoints() {
    var i;

    i = -1;
    while (++i < this.TOTAL_POINTS) {
      this.points.push(new Point({ index: i + 1 }, this));
    }

    i = -1;
    while (++i < this.TOTAL_AVG_POINTS) {
      this.avg_points.push(new AvgPoint({ index: i + 1 }, this));
    }

    i = null;
  }

  resizeHandler() {
    if (this.ctx) {
      this.w = 1250;
      this.h = 250;
      this.cx = this.w / 2;
      this.cy = this.h / 2;

      this.ctx.canvas.width = this.w;
      this.ctx.canvas.height = this.h;

      this.points.forEach(function(p) {
        p.updateDynamics();
      });

      this.avg_points.forEach(function(p) {
        p.updateDynamics();
      });
    }
  }

  render() {
    return <div />;
  }
}

class Star {
  constructor(context) {
    var xc, yc;

    this.x = Math.random() * context.w - context.cx;
    this.y = Math.random() * context.h - context.cy;
    this.z = this.max_depth = Math.max(context.w / context.h);
    this.radius = 0.2;

    xc = this.x > 0 ? 1 : -1;
    yc = this.y > 0 ? 1 : -1;

    if (Math.abs(this.x) > Math.abs(this.y)) {
      this.dx = 1.0;
      this.dy = Math.abs(this.y / this.x);
    } else {
      this.dx = Math.abs(this.x / this.y);
      this.dy = 1.0;
    }

    this.dx *= xc;
    this.dy *= yc;
    this.dz = -0.1;

    this.ddx = 0.001 * this.dx;
    this.ddy = 0.001 * this.dy;

    if (this.y > context.cy / 2) {
      this.color = context.stars_color_2;
    } else {
      if (context.avg > context.AVG_BREAK_POINT + 10) {
        this.color = context.stars_color_2;
      } else if (context.avg > context.STARS_BREAK_POINT) {
        this.color = context.stars_color_special;
      } else {
        this.color = context.stars_color;
      }
    }

    xc = yc = null;
  }
}

class Point {
  constructor(config, context) {
    debugger;
    this.index = config.index;
    this.angle = (this.index * 360) / context.TOTAL_POINTS;

    this.updateDynamics = function() {
      this.radius = Math.abs(context.w, context.h) / 10;
      this.x =
        context.cx + this.radius * context.sin(context.PI_HALF * this.angle);
      this.y =
        context.cy + this.radius * context.cos(context.PI_HALF * this.angle);
    };

    this.updateDynamics();

    this.value = Math.random() * 256;
    this.dx = this.x + this.value * context.sin(context.PI_HALF * this.angle);
    this.dy = this.y + this.value * context.cos(context.PI_HALF * this.angle);
  }
}

class AvgPoint {
  constructor(config, context) {
    this.index = config.index;
    this.angle = (this.index * 360) / context.TOTAL_AVG_POINTS;

    this.updateDynamics = function() {
      this.radius = Math.abs(context.w, context.h) / 10;
      this.x =
        context.cx + this.radius * context.sin(context.PI_HALF * this.angle);
      this.y =
        context.cy + this.radius * context.cos(context.PI_HALF * this.angle);
    };

    this.updateDynamics();

    this.value = Math.random() * 256;
    this.dx = this.x + this.value * context.sin(context.PI_HALF * this.angle);
    this.dy = this.y + this.value * context.cos(context.PI_HALF * this.angle);
  }
}
