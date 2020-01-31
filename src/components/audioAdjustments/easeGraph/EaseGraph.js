import React from "react";
import "./easeGraph.css";

import anime from "animejs/lib/anime.es.js";

import { linear, easeInQuad, easeInCubic } from "./data.js";

export default class EaseGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.bars = [];

    this.state = {
      graphData: linear
    };

    this.createBarPoints = this.createBarPoints.bind(this);
    //this.generateGraph = this.generateGraph.bind(this);
    this.drawGraph = this.drawGraph.bind(this);
  }

  componentDidMount() {
    this.rendered = true;
    //this.generateGraph();
    setTimeout(() => {
      this.drawGraph();
    }, 3000);
  }

  generateGraph() {
    setTimeout(() => {
      this.createBarPoints();
    }, 3000);

    setTimeout(() => {
      let extractedData = [];

      let interval = this.barData.length / 100;

      let countArray = [];
      for (let item of this.barData) {
        countArray.push(item.index);
      }

      var findClosest = function(x, arr) {
        var indexArr = arr.map(function(k) {
          return Math.abs(k - x);
        });
        var min = Math.min.apply(Math, indexArr);
        return arr[indexArr.indexOf(min)];
      };

      // Outputs 82
      let increment = 0;

      console.log("this.barData:");
      console.log(this.barData);
      console.log("interval:" + interval);
      console.log("countArray:");
      console.log(countArray);
      for (var i = 0; i < 100; i++) {
        let closest = findClosest(increment, countArray);

        console.log("increment:" + increment);
        console.log("closest:" + closest);
        console.log(JSON.stringify(this.barData[closest]));
        console.log(JSON.stringify(this.barData[closest].height));

        extractedData.push({
          index: i,
          height: this.barData[closest].height
        });
        increment += interval;
      }

      console.log(JSON.stringify(extractedData));
    }, 15000);
  }

  drawGraph() {
    const { bars } = this;
    // prepare stroke to be animated

    for (let i = 0; i < bars.length; i++) {
      console.log("animate");
      anime({
        targets: bars[i],
        height: this.state.graphData[i].height.replace("px", "") / 4,
        duration: 1000,
        easing: "linear",
        update: () => {}
      });
    }
    // animate stroke
  }

  // this is used to simulate an actual tween and capture
  // its data to draw on a graph,
  // only use this
  // when adding new ease functions
  createBarPoints() {
    const { bars } = this;
    // prepare stroke to be animated

    this.barData = [];
    let counter = 0;

    console.log("starting to log data");
    anime({
      targets: bars[0],
      height: 250,
      duration: 10000,
      easing: "easeInCubic",
      update: e => {
        this.barData.push({
          index: counter,
          height: e.animations[0].currentValue
        });
        counter += 1;
      }
    });
  }

  activePaths(el, linkType) {
    if (el === null || this.rendered) {
      return;
    }
    this.bars.push(el);
  }

  render() {
    let items = [];
    for (var i = 0; i < 100; i++) {
      items.push(i);
    }

    return (
      <div className="container grid">
        <div className="axis x" />
        <div className="axis y" />
        {items.map(bar => (
          <div
            key={bar}
            ref={el => this.activePaths(el)}
            className="bar"
            style={{
              height: 0,
              left: bar * 1.25,
              transformOrigin: "left bottom"
            }}
          />
        ))}
      </div>
    );
  }
}
